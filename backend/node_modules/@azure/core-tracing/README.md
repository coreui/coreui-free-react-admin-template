# Azure Core tracing library for JavaScript

This is the core tracing library that provides low-level interfaces and helper methods for tracing in Azure SDK JavaScript libraries which work in the browser and Node.js.

## Getting started

### Installation

Install this library using npm as follows

```
npm install @azure/core-tracing
```

## Key Concepts

The `@azure/core-tracing` package supports enabling tracing for Azure SDK packages, using an [OpenTelemetry](https://opentelemetry.io/) `Tracer`.

By default, all libraries log with a `NoOpTracer` that takes no action.
To change this, you have to use `setTracer` to set a new default `Tracer`.

## Examples

### Example 1 - Setting an OpenTelemetry Tracer

```js
const opentelemetry = require("@opentelemetry/api");
const { BasicTracer, SimpleSpanProcessor } = require("@opentelemetry/tracing");
const { ZipkinExporter } = require("@opentelemetry/exporter-zipkin");
const { setTracer } = require("@azure/core-tracing");

const exporter = new ZipkinExporter({
  serviceName: "azure-tracing-sample"
});
const tracer = new BasicTracer();
tracer.addSpanProcessor(new SimpleSpanProcessor(exporter));

setTracer(tracer);

const rootSpan = tracer.startSpan("root");
const context = opentelemetry.setSpan(opentelemetry.context.active(), rootSpan);

// Call some client library methods and pass rootSpan via tracingOptions.

rootSpan.end();
exporter.shutdown();
```

### Example 2 - Passing current Context to library operations

```js
// Given a BlobClient from @azure/storage-blob
const result = await blobClient.download(undefined, undefined, {
  tracingOptions: {
    tracingContext: context
  }
});
```

## Next steps

You can build and run the tests locally by executing `rushx test`. Explore the `test` folder to see advanced usage and behavior of the public classes.

## Troubleshooting

If you run into issues while using this library, please feel free to [file an issue](https://github.com/Azure/azure-sdk-for-js/issues/new).

## Contributing

If you'd like to contribute to this library, please read the [contributing guide](https://github.com/Azure/azure-sdk-for-js/blob/main/CONTRIBUTING.md) to learn more about how to build and test the code.

![Impressions](https://azure-sdk-impressions.azurewebsites.net/api/impressions/azure-sdk-for-js%2Fsdk%2Fcore%2Fcore-tracing%2FREADME.png)
