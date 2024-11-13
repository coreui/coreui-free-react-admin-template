// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.

import { replaceAll } from "./util/utils";

type URLQueryParseState = "ParameterName" | "ParameterValue" | "Invalid";

/**
 * A class that handles the query portion of a URLBuilder.
 */
export class URLQuery {
  private readonly _rawQuery: { [queryParameterName: string]: string | string[] } = {};

  /**
   * Get whether or not there any query parameters in this URLQuery.
   */
  public any(): boolean {
    return Object.keys(this._rawQuery).length > 0;
  }

  /**
   * Set a query parameter with the provided name and value. If the parameterValue is undefined or
   * empty, then this will attempt to remove an existing query parameter with the provided
   * parameterName.
   */
  public set(parameterName: string, parameterValue: any): void {
    if (parameterName) {
      if (parameterValue != undefined) {
        const newValue = Array.isArray(parameterValue) ? parameterValue : parameterValue.toString();
        this._rawQuery[parameterName] = newValue;
      } else {
        delete this._rawQuery[parameterName];
      }
    }
  }

  /**
   * Get the value of the query parameter with the provided name. If no parameter exists with the
   * provided parameter name, then undefined will be returned.
   */
  public get(parameterName: string): string | string[] | undefined {
    return parameterName ? this._rawQuery[parameterName] : undefined;
  }

  /**
   * Get the string representation of this query. The return value will not start with a "?".
   */
  public toString(): string {
    let result = "";
    for (const parameterName in this._rawQuery) {
      if (result) {
        result += "&";
      }
      const parameterValue = this._rawQuery[parameterName];
      if (Array.isArray(parameterValue)) {
        const parameterStrings = [];
        for (const parameterValueElement of parameterValue) {
          parameterStrings.push(`${parameterName}=${parameterValueElement}`);
        }
        result += parameterStrings.join("&");
      } else {
        result += `${parameterName}=${parameterValue}`;
      }
    }
    return result;
  }

  /**
   * Parse a URLQuery from the provided text.
   */
  public static parse(text: string): URLQuery {
    const result = new URLQuery();

    if (text) {
      if (text.startsWith("?")) {
        text = text.substring(1);
      }

      let currentState: URLQueryParseState = "ParameterName";

      let parameterName = "";
      let parameterValue = "";
      for (let i = 0; i < text.length; ++i) {
        const currentCharacter: string = text[i];
        switch (currentState) {
          case "ParameterName":
            switch (currentCharacter) {
              case "=":
                currentState = "ParameterValue";
                break;

              case "&":
                parameterName = "";
                parameterValue = "";
                break;

              default:
                parameterName += currentCharacter;
                break;
            }
            break;

          case "ParameterValue":
            switch (currentCharacter) {
              case "&":
                result.set(parameterName, parameterValue);
                parameterName = "";
                parameterValue = "";
                currentState = "ParameterName";
                break;

              default:
                parameterValue += currentCharacter;
                break;
            }
            break;

          default:
            throw new Error("Unrecognized URLQuery parse state: " + currentState);
        }
      }
      if (currentState === "ParameterValue") {
        result.set(parameterName, parameterValue);
      }
    }

    return result;
  }
}

/**
 * A class that handles creating, modifying, and parsing URLs.
 */
export class URLBuilder {
  private _scheme: string | undefined;
  private _host: string | undefined;
  private _port: string | undefined;
  private _path: string | undefined;
  private _query: URLQuery | undefined;

  /**
   * Set the scheme/protocol for this URL. If the provided scheme contains other parts of a URL
   * (such as a host, port, path, or query), those parts will be added to this URL as well.
   */
  public setScheme(scheme: string | undefined): void {
    if (!scheme) {
      this._scheme = undefined;
    } else {
      this.set(scheme, "SCHEME");
    }
  }

  /**
   * Get the scheme that has been set in this URL.
   */
  public getScheme(): string | undefined {
    return this._scheme;
  }

  /**
   * Set the host for this URL. If the provided host contains other parts of a URL (such as a
   * port, path, or query), those parts will be added to this URL as well.
   */
  public setHost(host: string | undefined): void {
    if (!host) {
      this._host = undefined;
    } else {
      this.set(host, "SCHEME_OR_HOST");
    }
  }

  /**
   * Get the host that has been set in this URL.
   */
  public getHost(): string | undefined {
    return this._host;
  }

  /**
   * Set the port for this URL. If the provided port contains other parts of a URL (such as a
   * path or query), those parts will be added to this URL as well.
   */
  public setPort(port: number | string | undefined): void {
    if (port == undefined || port === "") {
      this._port = undefined;
    } else {
      this.set(port.toString(), "PORT");
    }
  }

  /**
   * Get the port that has been set in this URL.
   */
  public getPort(): string | undefined {
    return this._port;
  }

  /**
   * Set the path for this URL. If the provided path contains a query, then it will be added to
   * this URL as well.
   */
  public setPath(path: string | undefined): void {
    if (!path) {
      this._path = undefined;
    } else {
      const schemeIndex = path.indexOf("://");
      if (schemeIndex !== -1) {
        const schemeStart = path.lastIndexOf("/", schemeIndex);
        // Make sure to only grab the URL part of the path before setting the state back to SCHEME
        // this will handle cases such as "/a/b/c/https://microsoft.com" => "https://microsoft.com"
        this.set(schemeStart === -1 ? path : path.substr(schemeStart + 1), "SCHEME");
      } else {
        this.set(path, "PATH");
      }
    }
  }

  /**
   * Append the provided path to this URL's existing path. If the provided path contains a query,
   * then it will be added to this URL as well.
   */
  public appendPath(path: string | undefined): void {
    if (path) {
      let currentPath: string | undefined = this.getPath();
      if (currentPath) {
        if (!currentPath.endsWith("/")) {
          currentPath += "/";
        }

        if (path.startsWith("/")) {
          path = path.substring(1);
        }

        path = currentPath + path;
      }
      this.set(path, "PATH");
    }
  }

  /**
   * Get the path that has been set in this URL.
   */
  public getPath(): string | undefined {
    return this._path;
  }

  /**
   * Set the query in this URL.
   */
  public setQuery(query: string | undefined): void {
    if (!query) {
      this._query = undefined;
    } else {
      this._query = URLQuery.parse(query);
    }
  }

  /**
   * Set a query parameter with the provided name and value in this URL's query. If the provided
   * query parameter value is undefined or empty, then the query parameter will be removed if it
   * existed.
   */
  public setQueryParameter(queryParameterName: string, queryParameterValue: any): void {
    if (queryParameterName) {
      if (!this._query) {
        this._query = new URLQuery();
      }
      this._query.set(queryParameterName, queryParameterValue);
    }
  }

  /**
   * Get the value of the query parameter with the provided query parameter name. If no query
   * parameter exists with the provided name, then undefined will be returned.
   */
  public getQueryParameterValue(queryParameterName: string): string | string[] | undefined {
    return this._query ? this._query.get(queryParameterName) : undefined;
  }

  /**
   * Get the query in this URL.
   */
  public getQuery(): string | undefined {
    return this._query ? this._query.toString() : undefined;
  }

  /**
   * Set the parts of this URL by parsing the provided text using the provided startState.
   */
  private set(text: string, startState: URLTokenizerState): void {
    const tokenizer = new URLTokenizer(text, startState);

    while (tokenizer.next()) {
      const token: URLToken | undefined = tokenizer.current();
      if (token) {
        switch (token.type) {
          case "SCHEME":
            this._scheme = token.text || undefined;
            break;

          case "HOST":
            this._host = token.text || undefined;
            break;

          case "PORT":
            this._port = token.text || undefined;
            break;

          case "PATH":
            const tokenPath: string | undefined = token.text || undefined;
            if (!this._path || this._path === "/" || tokenPath !== "/") {
              this._path = tokenPath;
            }
            break;

          case "QUERY":
            this._query = URLQuery.parse(token.text);
            break;

          default:
            throw new Error(`Unrecognized URLTokenType: ${token.type}`);
        }
      }
    }
  }

  public toString(): string {
    let result = "";

    if (this._scheme) {
      result += `${this._scheme}://`;
    }

    if (this._host) {
      result += this._host;
    }

    if (this._port) {
      result += `:${this._port}`;
    }

    if (this._path) {
      if (!this._path.startsWith("/")) {
        result += "/";
      }
      result += this._path;
    }

    if (this._query && this._query.any()) {
      result += `?${this._query.toString()}`;
    }

    return result;
  }

  /**
   * If the provided searchValue is found in this URLBuilder, then replace it with the provided
   * replaceValue.
   */
  public replaceAll(searchValue: string, replaceValue: string): void {
    if (searchValue) {
      this.setScheme(replaceAll(this.getScheme(), searchValue, replaceValue));
      this.setHost(replaceAll(this.getHost(), searchValue, replaceValue));
      this.setPort(replaceAll(this.getPort(), searchValue, replaceValue));
      this.setPath(replaceAll(this.getPath(), searchValue, replaceValue));
      this.setQuery(replaceAll(this.getQuery(), searchValue, replaceValue));
    }
  }

  public static parse(text: string): URLBuilder {
    const result = new URLBuilder();
    result.set(text, "SCHEME_OR_HOST");
    return result;
  }
}

type URLTokenizerState = "SCHEME" | "SCHEME_OR_HOST" | "HOST" | "PORT" | "PATH" | "QUERY" | "DONE";

type URLTokenType = "SCHEME" | "HOST" | "PORT" | "PATH" | "QUERY";

export class URLToken {
  public constructor(public readonly text: string, public readonly type: URLTokenType) {}

  public static scheme(text: string): URLToken {
    return new URLToken(text, "SCHEME");
  }

  public static host(text: string): URLToken {
    return new URLToken(text, "HOST");
  }

  public static port(text: string): URLToken {
    return new URLToken(text, "PORT");
  }

  public static path(text: string): URLToken {
    return new URLToken(text, "PATH");
  }

  public static query(text: string): URLToken {
    return new URLToken(text, "QUERY");
  }
}

/**
 * Get whether or not the provided character (single character string) is an alphanumeric (letter or
 * digit) character.
 */
export function isAlphaNumericCharacter(character: string): boolean {
  const characterCode: number = character.charCodeAt(0);
  return (
    (48 /* '0' */ <= characterCode && characterCode <= 57) /* '9' */ ||
    (65 /* 'A' */ <= characterCode && characterCode <= 90) /* 'Z' */ ||
    (97 /* 'a' */ <= characterCode && characterCode <= 122) /* 'z' */
  );
}

/**
 * A class that tokenizes URL strings.
 */
export class URLTokenizer {
  readonly _textLength: number;
  _currentState: URLTokenizerState;
  _currentIndex: number;
  _currentToken: URLToken | undefined;

  public constructor(readonly _text: string, state?: URLTokenizerState) {
    this._textLength = _text ? _text.length : 0;
    this._currentState = state != undefined ? state : "SCHEME_OR_HOST";
    this._currentIndex = 0;
  }

  /**
   * Get the current URLToken this URLTokenizer is pointing at, or undefined if the URLTokenizer
   * hasn't started or has finished tokenizing.
   */
  public current(): URLToken | undefined {
    return this._currentToken;
  }

  /**
   * Advance to the next URLToken and return whether or not a URLToken was found.
   */
  public next(): boolean {
    if (!hasCurrentCharacter(this)) {
      this._currentToken = undefined;
    } else {
      switch (this._currentState) {
        case "SCHEME":
          nextScheme(this);
          break;

        case "SCHEME_OR_HOST":
          nextSchemeOrHost(this);
          break;

        case "HOST":
          nextHost(this);
          break;

        case "PORT":
          nextPort(this);
          break;

        case "PATH":
          nextPath(this);
          break;

        case "QUERY":
          nextQuery(this);
          break;

        default:
          throw new Error(`Unrecognized URLTokenizerState: ${this._currentState}`);
      }
    }
    return !!this._currentToken;
  }
}

/**
 * Read the remaining characters from this Tokenizer's character stream.
 */
function readRemaining(tokenizer: URLTokenizer): string {
  let result = "";
  if (tokenizer._currentIndex < tokenizer._textLength) {
    result = tokenizer._text.substring(tokenizer._currentIndex);
    tokenizer._currentIndex = tokenizer._textLength;
  }
  return result;
}

/**
 * Whether or not this URLTokenizer has a current character.
 */
function hasCurrentCharacter(tokenizer: URLTokenizer): boolean {
  return tokenizer._currentIndex < tokenizer._textLength;
}

/**
 * Get the character in the text string at the current index.
 */
function getCurrentCharacter(tokenizer: URLTokenizer): string {
  return tokenizer._text[tokenizer._currentIndex];
}

/**
 * Advance to the character in text that is "step" characters ahead. If no step value is provided,
 * then step will default to 1.
 */
function nextCharacter(tokenizer: URLTokenizer, step?: number): void {
  if (hasCurrentCharacter(tokenizer)) {
    if (!step) {
      step = 1;
    }
    tokenizer._currentIndex += step;
  }
}

/**
 * Starting with the current character, peek "charactersToPeek" number of characters ahead in this
 * Tokenizer's stream of characters.
 */
function peekCharacters(tokenizer: URLTokenizer, charactersToPeek: number): string {
  let endIndex: number = tokenizer._currentIndex + charactersToPeek;
  if (tokenizer._textLength < endIndex) {
    endIndex = tokenizer._textLength;
  }
  return tokenizer._text.substring(tokenizer._currentIndex, endIndex);
}

/**
 * Read characters from this Tokenizer until the end of the stream or until the provided condition
 * is false when provided the current character.
 */
function readWhile(tokenizer: URLTokenizer, condition: (character: string) => boolean): string {
  let result = "";

  while (hasCurrentCharacter(tokenizer)) {
    const currentCharacter: string = getCurrentCharacter(tokenizer);
    if (!condition(currentCharacter)) {
      break;
    } else {
      result += currentCharacter;
      nextCharacter(tokenizer);
    }
  }

  return result;
}

/**
 * Read characters from this Tokenizer until a non-alphanumeric character or the end of the
 * character stream is reached.
 */
function readWhileLetterOrDigit(tokenizer: URLTokenizer): string {
  return readWhile(tokenizer, (character: string) => isAlphaNumericCharacter(character));
}

/**
 * Read characters from this Tokenizer until one of the provided terminating characters is read or
 * the end of the character stream is reached.
 */
function readUntilCharacter(tokenizer: URLTokenizer, ...terminatingCharacters: string[]): string {
  return readWhile(
    tokenizer,
    (character: string) => terminatingCharacters.indexOf(character) === -1
  );
}

function nextScheme(tokenizer: URLTokenizer): void {
  const scheme: string = readWhileLetterOrDigit(tokenizer);
  tokenizer._currentToken = URLToken.scheme(scheme);
  if (!hasCurrentCharacter(tokenizer)) {
    tokenizer._currentState = "DONE";
  } else {
    tokenizer._currentState = "HOST";
  }
}

function nextSchemeOrHost(tokenizer: URLTokenizer): void {
  const schemeOrHost: string = readUntilCharacter(tokenizer, ":", "/", "?");
  if (!hasCurrentCharacter(tokenizer)) {
    tokenizer._currentToken = URLToken.host(schemeOrHost);
    tokenizer._currentState = "DONE";
  } else if (getCurrentCharacter(tokenizer) === ":") {
    if (peekCharacters(tokenizer, 3) === "://") {
      tokenizer._currentToken = URLToken.scheme(schemeOrHost);
      tokenizer._currentState = "HOST";
    } else {
      tokenizer._currentToken = URLToken.host(schemeOrHost);
      tokenizer._currentState = "PORT";
    }
  } else {
    tokenizer._currentToken = URLToken.host(schemeOrHost);
    if (getCurrentCharacter(tokenizer) === "/") {
      tokenizer._currentState = "PATH";
    } else {
      tokenizer._currentState = "QUERY";
    }
  }
}

function nextHost(tokenizer: URLTokenizer): void {
  if (peekCharacters(tokenizer, 3) === "://") {
    nextCharacter(tokenizer, 3);
  }

  const host: string = readUntilCharacter(tokenizer, ":", "/", "?");
  tokenizer._currentToken = URLToken.host(host);

  if (!hasCurrentCharacter(tokenizer)) {
    tokenizer._currentState = "DONE";
  } else if (getCurrentCharacter(tokenizer) === ":") {
    tokenizer._currentState = "PORT";
  } else if (getCurrentCharacter(tokenizer) === "/") {
    tokenizer._currentState = "PATH";
  } else {
    tokenizer._currentState = "QUERY";
  }
}

function nextPort(tokenizer: URLTokenizer): void {
  if (getCurrentCharacter(tokenizer) === ":") {
    nextCharacter(tokenizer);
  }

  const port: string = readUntilCharacter(tokenizer, "/", "?");
  tokenizer._currentToken = URLToken.port(port);

  if (!hasCurrentCharacter(tokenizer)) {
    tokenizer._currentState = "DONE";
  } else if (getCurrentCharacter(tokenizer) === "/") {
    tokenizer._currentState = "PATH";
  } else {
    tokenizer._currentState = "QUERY";
  }
}

function nextPath(tokenizer: URLTokenizer): void {
  const path: string = readUntilCharacter(tokenizer, "?");
  tokenizer._currentToken = URLToken.path(path);

  if (!hasCurrentCharacter(tokenizer)) {
    tokenizer._currentState = "DONE";
  } else {
    tokenizer._currentState = "QUERY";
  }
}

function nextQuery(tokenizer: URLTokenizer): void {
  if (getCurrentCharacter(tokenizer) === "?") {
    nextCharacter(tokenizer);
  }

  const query: string = readRemaining(tokenizer);
  tokenizer._currentToken = URLToken.query(query);
  tokenizer._currentState = "DONE";
}
