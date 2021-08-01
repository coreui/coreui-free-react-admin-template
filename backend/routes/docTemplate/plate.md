<a name="top"></a>
# <%= project.name %> v<%= project.version %>

<%= project.description %>

<% data.forEach(group => { -%>
 - [<%= group.name %>](#<%= toLink(group.name.replace('/','')).toLowerCase() -%>)
<% group.subs.forEach(sub => { -%>
   - [<%= sub.title %>](#<%= toLink(sub.title.replace('/','')).toLowerCase() %>)
<% })}) -%>

___

<% if (prepend) { -%>
<%- prepend %>
<% } -%>
<% data.forEach(group => { -%>

# <%= group.name %>
<% group.subs.forEach(sub => { -%>

## <%= sub.title %>
[Back to top](#top)

<%- sub.description ? `${sub.description.replace('<p>', '').replace('</p>', '').replace('<ul>','').replace('</ul>','')}\n\n` : '' -%>
```
<%- sub.type.toUpperCase() %> <%= sub.url %>
```
<% if (sub.header && sub.header.fields) { -%>
<% Object.entries(sub.header.fields).forEach(([headersGroup, headersGroupContent]) => { -%>

### Headers - `<%= headersGroup %>`

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
<% headersGroupContent.forEach(header => { -%>
| <%- header.field %> | <%- header.type ? `\`${header.type}\`` : '' %> | <%- header.optional ? '**optional**' : '' %><%- header.description.replace('<p>', '').replace('</p>', '').replace('<ul>','').replace('</ul>',''); %> |
<% }) // foreach parameter -%>
<% }) // foreach header fields -%>
<% } // if parameters -%>
<% if (sub.header && sub.header.examples && sub.header.examples.length) { -%>

### Header examples
<% sub.header.examples.forEach(example => { -%>
<%= example.title %>

```<%= example.type %>
<%- example.content %>
```
<% }) // foreach example -%>
<% } // if example -%>
<% if (sub.parameter && sub.parameter.fields) { -%>
<% Object.entries(sub.parameter.fields).forEach(([parametersGroup, parametersGroupContent]) => { -%>

### Parameters - `<%= parametersGroup -%>`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
<% parametersGroupContent.forEach(param => { -%>
| <%- `${'&ensp;'.repeat(param.field.split('.').length-1)}`+param.field.split('.').pop() -%> | <%- param.type ? `\`${param.type}\`` : '' %> | <%- param.optional ? '**optional** ' : '' -%><%- param.description.replace('<p>', '').replace('</p>', '').replace('<ul>','').replace('</ul>',''); -%>
<% if (param.defaultValue) { -%>
_Default value: <%= param.defaultValue %>_<br><% } -%>
<% if (param.size) { -%>
_Size range: <%- param.size %>_<br><% } -%>
<% if (param.allowedValues) { -%>
_Allowed values: <%- param.allowedValues %>_<% } -%> |
<% }) // foreach parameters -%>
<% }) // foreach param parameter -%>
<% } // if parameters -%>
<% if (sub.examples && sub.examples.length) { -%>

### Examples
<% sub.examples.forEach(example => { -%>
<%= example.title %>

```<%= example.type %>
<%- example.content %>
```
<% }) // foreach example -%>
<% } // if example -%>
<% if (sub.parameter && sub.parameter.examples && sub.parameter.examples.length) { -%>

### Parameters examples
<% sub.parameter.examples.forEach(exampleParam => { -%>
`<%= exampleParam.type %>` - <%= exampleParam.title %>

```<%= exampleParam.type %>
<%- exampleParam.content %>
```
<% }) // foreach exampleParam -%>
<% } // if exampleParam -%>
<% if (sub.success && sub.success.fields) { -%>

### Success response
<% Object.entries(sub.success.fields).forEach(([responsesGroup, responsesGroupContent]) => { -%>

#### Success response - `<%= responsesGroup %>`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
<% responsesGroupContent.forEach(param => { -%>
| <%- `${'&ensp;'.repeat(param.field.split('.').length-1)}`+param.field.split('.').pop() %> | <%- param.type ? `\`${param.type}\`` : '' %> | <%- param.optional ? '**optional**' : '' %><%- param.description.replace('<p>', '').replace('</p>', '').replace('<ul>','').replace('</ul>',''); -%>
<% if (param.defaultValue) { -%>
_Default value: <%- param.defaultValue %>_<br><% } -%>
<% if (param.size) { -%>
_Size range: <%- param.size -%>_<br><% } -%>
<% if (param.allowedValues) { -%>
_Allowed values: <%- param.allowedValues %>_<% } -%> |
<% }) // foreach reponses -%>
<% }) // foreach field -%>
<% } // if success.fields -%>
<% if (sub.success && sub.success.examples && sub.success.examples.length) { -%>

### Success response example
<% sub.success.examples.forEach(example => { -%>

#### Success response example - `<%= example.title %>`

```<%= example.type %>
<%- example.content %>
```
<% }) // foreach success example -%>
<% } // if success.examples -%>
<% if (sub.error && sub.error.fields) { -%>

### Error response
<% Object.entries(sub.error.fields).forEach(([errorsGroup, errorsGroupContent]) => { -%>

#### Error response - `<%= errorsGroup %>`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
<% errorsGroupContent.forEach(param => { -%>
| <%- `${'&ensp;'.repeat(param.field.split('.').length-1)}`+param.field.split('.').pop() %> | <%- param.type ? `\`${param.type}\`` : '' %> | <%- param.optional ? '**optional**' : '' %><%- param.description.replace('<p>', '').replace('</p>', '').replace('<ul>','').replace('</ul>',''); -%>
<% if (param.defaultValue) { -%>
_Default value: <%- param.defaultValue %>_<br><% } -%>
<% if (param.size) { -%>
_Size range: <%- param.size -%>_<br><% } -%>
<% if (param.allowedValues) { -%>
_Allowed values: <%- param.allowedValues %>_<% } -%> |
<% }) // foreach errors -%>
<% }) // foreach field -%>
<% } // if error.fields -%>
<% if (sub.error && sub.error.examples && sub.error.examples.length) { -%>

### Error response example
<% sub.error.examples.forEach(example => { -%>

#### Error response example - `<%= example.title %>`

```<%= example.type %>
<%- example.content %>
```
<% }) // foreach error example -%>
<% } // if error.examples -%>
<% }) // foreach sub -%>
<% }) // foreach group -%>
