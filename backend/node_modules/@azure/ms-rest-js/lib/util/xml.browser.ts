// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.

const parser = new DOMParser();

// Policy to make our code Trusted Types compliant.
//   https://github.com/w3c/webappsec-trusted-types
// We are calling DOMParser.parseFromString() to parse XML payload from Azure services.
// The parsed DOM object is not exposed to outside. Scripts are disabled when parsing
// according to the spec.  There are no HTML/XSS security concerns on the usage of
// parseFromString() here.
let ttPolicy: Pick<TrustedTypePolicy, "createHTML"> | undefined;
try {
  if (typeof self.trustedTypes !== "undefined") {
    ttPolicy = self.trustedTypes.createPolicy("@azure/ms-rest-js#xml.browser", {
      createHTML: (s: any) => s,
    });
  }
} catch (e) {
  console.warn('Could not create trusted types policy "@azure/ms-rest-js#xml.browser"');
}

export function parseXML(str: string): Promise<any> {
  try {
    const dom = parser.parseFromString((ttPolicy?.createHTML(str) ?? str) as string, "application/xml");
    throwIfError(dom);

    const obj = domToObject(dom.childNodes[0]);
    return Promise.resolve(obj);
  } catch (err) {
    return Promise.reject(err);
  }
}

let errorNS = "";
try {
  const invalidXML = (ttPolicy?.createHTML("INVALID") ?? "INVALID") as string;
  errorNS =
    parser.parseFromString(invalidXML, "text/xml").getElementsByTagName("parsererror")[0]
      .namespaceURI! ?? "";
} catch (ignored) {
  // Most browsers will return a document containing <parsererror>, but IE will throw.
}

function throwIfError(dom: Document) {
  if (errorNS) {
    const parserErrors = dom.getElementsByTagNameNS(errorNS, "parsererror");
    if (parserErrors.length) {
      throw new Error(parserErrors.item(0)!.innerHTML);
    }
  }
}

function isElement(node: Node): node is Element {
  return !!(node as Element).attributes;
}

/**
 * Get the Element-typed version of the provided Node if the provided node is an element with
 * attributes. If it isn't, then undefined is returned.
 */
function asElementWithAttributes(node: Node): Element | undefined {
  return isElement(node) && node.hasAttributes() ? node : undefined;
}

function domToObject(node: Node): any {
  let result: any = {};

  const childNodeCount: number = node.childNodes.length;

  const firstChildNode: Node = node.childNodes[0];
  const onlyChildTextValue: string | undefined =
    (firstChildNode &&
      childNodeCount === 1 &&
      firstChildNode.nodeType === Node.TEXT_NODE &&
      firstChildNode.nodeValue) ||
    undefined;

  const elementWithAttributes: Element | undefined = asElementWithAttributes(node);
  if (elementWithAttributes) {
    result["$"] = {};

    for (let i = 0; i < elementWithAttributes.attributes.length; i++) {
      const attr = elementWithAttributes.attributes[i];
      result["$"][attr.nodeName] = attr.nodeValue;
    }

    if (onlyChildTextValue) {
      result["_"] = onlyChildTextValue;
    }
  } else if (childNodeCount === 0) {
    result = "";
  } else if (onlyChildTextValue) {
    result = onlyChildTextValue;
  }

  if (!onlyChildTextValue) {
    for (let i = 0; i < childNodeCount; i++) {
      const child = node.childNodes[i];
      // Ignore leading/trailing whitespace nodes
      if (child.nodeType !== Node.TEXT_NODE) {
        const childObject: any = domToObject(child);
        if (!result[child.nodeName]) {
          result[child.nodeName] = childObject;
        } else if (Array.isArray(result[child.nodeName])) {
          result[child.nodeName].push(childObject);
        } else {
          result[child.nodeName] = [result[child.nodeName], childObject];
        }
      }
    }
  }

  return result;
}

// tslint:disable-next-line:no-null-keyword
const doc = document.implementation.createDocument(null, null, null);
const serializer = new XMLSerializer();

export function stringifyXML(obj: any, opts?: { rootName?: string }) {
  const rootName = (opts && opts.rootName) || "root";
  const dom = buildNode(obj, rootName)[0];
  return (
    '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>' + serializer.serializeToString(dom)
  );
}

function buildAttributes(attrs: { [key: string]: { toString(): string } }): Attr[] {
  const result = [];
  for (const key of Object.keys(attrs)) {
    const attr = doc.createAttribute(key);
    attr.value = attrs[key].toString();
    result.push(attr);
  }
  return result;
}

function buildNode(obj: any, elementName: string): Node[] {
  if (typeof obj === "string" || typeof obj === "number" || typeof obj === "boolean") {
    const elem = doc.createElement(elementName);
    elem.textContent = obj.toString();
    return [elem];
  } else if (Array.isArray(obj)) {
    const result = [];
    for (const arrayElem of obj) {
      for (const child of buildNode(arrayElem, elementName)) {
        result.push(child);
      }
    }
    return result;
  } else if (typeof obj === "object") {
    const elem = doc.createElement(elementName);
    for (const key of Object.keys(obj)) {
      if (key === "$") {
        for (const attr of buildAttributes(obj[key])) {
          elem.attributes.setNamedItem(attr);
        }
      } else {
        for (const child of buildNode(obj[key], key)) {
          elem.appendChild(child);
        }
      }
    }
    return [elem];
  } else {
    throw new Error(`Illegal value passed to buildObject: ${obj}`);
  }
}
