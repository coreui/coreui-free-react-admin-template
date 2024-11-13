"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.typeByName = exports.TYPES = exports.TYPE = void 0;

var _null = _interopRequireDefault(require("./data-types/null"));

var _tinyint = _interopRequireDefault(require("./data-types/tinyint"));

var _bit = _interopRequireDefault(require("./data-types/bit"));

var _smallint = _interopRequireDefault(require("./data-types/smallint"));

var _int = _interopRequireDefault(require("./data-types/int"));

var _smalldatetime = _interopRequireDefault(require("./data-types/smalldatetime"));

var _real = _interopRequireDefault(require("./data-types/real"));

var _money = _interopRequireDefault(require("./data-types/money"));

var _datetime = _interopRequireDefault(require("./data-types/datetime"));

var _float = _interopRequireDefault(require("./data-types/float"));

var _decimal = _interopRequireDefault(require("./data-types/decimal"));

var _numeric = _interopRequireDefault(require("./data-types/numeric"));

var _smallmoney = _interopRequireDefault(require("./data-types/smallmoney"));

var _bigint = _interopRequireDefault(require("./data-types/bigint"));

var _image = _interopRequireDefault(require("./data-types/image"));

var _text = _interopRequireDefault(require("./data-types/text"));

var _uniqueidentifier = _interopRequireDefault(require("./data-types/uniqueidentifier"));

var _intn = _interopRequireDefault(require("./data-types/intn"));

var _ntext = _interopRequireDefault(require("./data-types/ntext"));

var _bitn = _interopRequireDefault(require("./data-types/bitn"));

var _decimaln = _interopRequireDefault(require("./data-types/decimaln"));

var _numericn = _interopRequireDefault(require("./data-types/numericn"));

var _floatn = _interopRequireDefault(require("./data-types/floatn"));

var _moneyn = _interopRequireDefault(require("./data-types/moneyn"));

var _datetimen = _interopRequireDefault(require("./data-types/datetimen"));

var _varbinary = _interopRequireDefault(require("./data-types/varbinary"));

var _varchar = _interopRequireDefault(require("./data-types/varchar"));

var _binary = _interopRequireDefault(require("./data-types/binary"));

var _char = _interopRequireDefault(require("./data-types/char"));

var _nvarchar = _interopRequireDefault(require("./data-types/nvarchar"));

var _nchar = _interopRequireDefault(require("./data-types/nchar"));

var _xml = _interopRequireDefault(require("./data-types/xml"));

var _time = _interopRequireDefault(require("./data-types/time"));

var _date = _interopRequireDefault(require("./data-types/date"));

var _datetime2 = _interopRequireDefault(require("./data-types/datetime2"));

var _datetimeoffset = _interopRequireDefault(require("./data-types/datetimeoffset"));

var _udt = _interopRequireDefault(require("./data-types/udt"));

var _tvp = _interopRequireDefault(require("./data-types/tvp"));

var _sqlVariant = _interopRequireDefault(require("./data-types/sql-variant"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const TYPE = {
  [_null.default.id]: _null.default,
  [_tinyint.default.id]: _tinyint.default,
  [_bit.default.id]: _bit.default,
  [_smallint.default.id]: _smallint.default,
  [_int.default.id]: _int.default,
  [_smalldatetime.default.id]: _smalldatetime.default,
  [_real.default.id]: _real.default,
  [_money.default.id]: _money.default,
  [_datetime.default.id]: _datetime.default,
  [_float.default.id]: _float.default,
  [_decimal.default.id]: _decimal.default,
  [_numeric.default.id]: _numeric.default,
  [_smallmoney.default.id]: _smallmoney.default,
  [_bigint.default.id]: _bigint.default,
  [_image.default.id]: _image.default,
  [_text.default.id]: _text.default,
  [_uniqueidentifier.default.id]: _uniqueidentifier.default,
  [_intn.default.id]: _intn.default,
  [_ntext.default.id]: _ntext.default,
  [_bitn.default.id]: _bitn.default,
  [_decimaln.default.id]: _decimaln.default,
  [_numericn.default.id]: _numericn.default,
  [_floatn.default.id]: _floatn.default,
  [_moneyn.default.id]: _moneyn.default,
  [_datetimen.default.id]: _datetimen.default,
  [_varbinary.default.id]: _varbinary.default,
  [_varchar.default.id]: _varchar.default,
  [_binary.default.id]: _binary.default,
  [_char.default.id]: _char.default,
  [_nvarchar.default.id]: _nvarchar.default,
  [_nchar.default.id]: _nchar.default,
  [_xml.default.id]: _xml.default,
  [_time.default.id]: _time.default,
  [_date.default.id]: _date.default,
  [_datetime2.default.id]: _datetime2.default,
  [_datetimeoffset.default.id]: _datetimeoffset.default,
  [_udt.default.id]: _udt.default,
  [_tvp.default.id]: _tvp.default,
  [_sqlVariant.default.id]: _sqlVariant.default
};
/**
 * <table>
 * <thead>
 *   <tr>
 *     <th>Type</th>
 *     <th>Constant</th>
 *     <th>JavaScript</th>
 *     <th>Result set</th>
 *     <th>Parameter</th>
 *   </tr>
 * </thead>
 *
 * <tbody>
 *   <tr class="group-heading">
 *     <th colspan="5">Exact numerics</th>
 *   </tr>
 *   <tr>
 *     <td><code>bit</code></td>
 *     <td><code>[[TYPES.Bit]]</code></td>
 *     <td><code>boolean</code></td>
 *     <td>✓</td>
 *     <td>✓</td>
 *   </tr>
 *   <tr>
 *     <td><code>tinyint</code></td>
 *     <td><code>[[TYPES.TinyInt]]</code></td>
 *     <td><code>number</code></td>
 *     <td>✓</td>
 *     <td>✓</td>
 *   </tr>
 *   <tr>
 *     <td><code>smallint</code></td>
 *     <td><code>[[TYPES.SmallInt]]</code></td>
 *     <td><code>number</code></td>
 *     <td>✓</td>
 *     <td>✓</td>
 *   </tr>
 *   <tr>
 *     <td><code>int</code></td>
 *     <td><code>[[TYPES.Int]]</code></td>
 *     <td><code>number</code></td>
 *     <td>✓</td>
 *     <td>✓</td>
 *   </tr>
 *   <tr>
 *     <td><code>bigint</code><sup>1</sup></td>
 *     <td><code>[[TYPES.BigInt]]</code></td>
 *     <td><code>string</code></td>
 *     <td>✓</td>
 *     <td>✓</td>
 *   </tr>
 *   <tr>
 *     <td><code>numeric</code><sup>2</sup></td>
 *     <td><code>[[TYPES.Numeric]]</code></td>
 *     <td><code>number</code></td>
 *     <td>✓</td>
 *     <td>✓</td>
 *   </tr>
 *   <tr>
 *     <td><code>decimal</code><sup>2</sup></td>
 *     <td><code>[[TYPES.Decimal]]</code></td>
 *     <td><code>number</code></td>
 *     <td>✓</td>
 *     <td>✓</td>
 *   </tr>
 *   <tr>
 *     <td><code>smallmoney</code></td>
 *     <td><code>[[TYPES.SmallMoney]]</code></td>
 *     <td><code>number</code></td>
 *     <td>✓</td>
 *     <td>✓</td>
 *   </tr>
 *   <tr>
 *     <td><code>money</code></td>
 *     <td><code>[[TYPES.Money]]</code></td>
 *     <td><code>number</code></td>
 *     <td>✓</td>
 *     <td>✓</td>
 *   </tr>
 * </tbody>
 *
 * <tbody>
 *   <tr class="group-heading">
 *     <th colspan="5">Approximate numerics</th>
 *   </tr>
 *   <tr>
 *     <td><code>float</code></td>
 *     <td><code>[[TYPES.Float]]</code></td>
 *     <td><code>number</code></td>
 *     <td>✓</td>
 *     <td>✓</td>
 *   </tr>
 *   <tr>
 *     <td><code>real</code></td>
 *     <td><code>[[TYPES.Real]]</code></td>
 *     <td><code>number</code></td>
 *     <td>✓</td>
 *     <td>✓</td>
 *   </tr>
 * </tbody>
 *
 * <tbody>
 *   <tr class="group-heading">
 *     <th colspan="4">Date and Time</th>
 *   </tr>
 *   <tr>
 *     <td><code>smalldatetime</code></td>
 *     <td><code>[[TYPES.SmallDateTime]]</code></td>
 *     <td><code>Date</code></td>
 *     <td>✓</td>
 *     <td>✓</td>
 *   </tr>
 *   <tr>
 *     <td><code>datetime</code></td>
 *     <td><code>[[TYPES.DateTime]]</code></td>
 *     <td><code>Date</code></td>
 *     <td>✓</td>
 *     <td>✓</td>
 *   </tr>
 *   <tr>
 *     <td><code>datetime2</code></td>
 *     <td><code>[[TYPES.DateTime2]]</code></td>
 *     <td><code>Date</code></td>
 *     <td>✓</td>
 *     <td>✓</td>
 *   </tr>
 *   <tr>
 *     <td><code>datetimeoffset</code></td>
 *     <td><code>[[TYPES.DateTimeOffset]]</code></td>
 *     <td><code>Date</code></td>
 *     <td>✓</td>
 *     <td>✓</td>
 *   </tr>
 *   <tr>
 *     <td><code>time</code></td>
 *     <td><code>[[TYPES.Time]]</code></td>
 *     <td><code>Date</code></td>
 *     <td>✓</td>
 *     <td>✓</td>
 *   </tr>
 *   <tr>
 *     <td><code>date</code></td>
 *     <td><code>[[TYPES.Date]]</code></td>
 *     <td><code>Date</code></td>
 *     <td>✓</td>
 *     <td>✓</td>
 *   </tr>
 * </tbody>
 *
 * <tbody>
 *   <tr class="group-heading">
 *     <th colspan="4">Character Strings</th>
 *   </tr>
 *   <tr>
 *     <td><code>char</code></td>
 *     <td><code>[[TYPES.Char]]</code></td>
 *     <td><code>string</code></td>
 *     <td>✓</td>
 *     <td>✓</td>
 *   </tr>
 *   <tr>
 *     <td><code>varchar</code><sup>3</sup></td>
 *     <td><code>[[TYPES.VarChar]]</code></td>
 *     <td><code>string</code></td>
 *     <td>✓</td>
 *     <td>✓</td>
 *   </tr>
 *   <tr>
 *     <td><code>text</code></td>
 *     <td><code>[[TYPES.Text]]</code></td>
 *     <td><code>string</code></td>
 *     <td>✓</td>
 *     <td>✓</td>
 *   </tr>
 * </tbody>
 *
 * <tbody>
 *   <tr class="group-heading">
 *     <th colspan="4">Unicode Strings</th>
 *   </tr>
 *   <tr>
 *     <td><code>nchar</code></td>
 *     <td><code>[[TYPES.NChar]]</code></td>
 *     <td><code>string</code></td>
 *     <td>✓</td>
 *     <td>✓</td>
 *   </tr>
 *   <tr>
 *     <td><code>nvarchar</code><sup>3</sup></td>
 *     <td><code>[[TYPES.NVarChar]]</code></td>
 *     <td><code>string</code></td>
 *     <td>✓</td>
 *     <td>✓</td>
 *   </tr>
 *   <tr>
 *     <td><code>ntext</code></td>
 *     <td><code>[[TYPES.NText]]</code></td>
 *     <td><code>string</code></td>
 *     <td>✓</td>
 *     <td>-</td>
 *   </tr>
 * </tbody>
 *
 * <tbody>
 *   <tr class="group-heading">
 *     <th colspan="5">Binary Strings<sup>4</sup></th>
 *   </tr>
 *   <tr>
 *     <td><code>binary</code></td>
 *     <td><code>[[TYPES.Binary]]</code></td>
 *     <td><code>Buffer</code></td>
 *     <td>✓</td>
 *     <td>✓</td>
 *   </tr>
 *   <tr>
 *     <td><code>varbinary</code></td>
 *     <td><code>[[TYPES.VarBinary]]</code></td>
 *     <td><code>Buffer</code></td>
 *     <td>✓</td>
 *     <td>✓</td>
 *   </tr>
 *   <tr>
 *     <td><code>image</code></td>
 *     <td><code>[[TYPES.Image]]</code></td>
 *     <td><code>Buffer</code></td>
 *     <td>✓</td>
 *     <td>✓</td>
 *   </tr>
 * </tbody>
 *
 * <tbody>
 *   <tr class="group-heading">
 *     <th colspan="5">Other Data Types</th>
 *   </tr>
 *   <tr>
 *     <td><code>TVP</code></td>
 *     <td><code>[[TYPES.TVP]]</code></td>
 *     <td><code>Object</code></td>
 *     <td>-</td>
 *     <td>✓</td>
 *   </tr>
 *   <tr>
 *     <td><code>UDT</code></td>
 *     <td><code>[[TYPES.UDT]]</code></td>
 *     <td><code>Buffer</code></td>
 *     <td>✓</td>
 *     <td>-</td>
 *   </tr>
 *   <tr>
 *     <td><code>uniqueidentifier</code><sup>4</sup></td>
 *     <td><code>[[TYPES.UniqueIdentifier]]</code></td>
 *     <td><code>string</code></td>
 *     <td>✓</td>
 *     <td>✓</td>
 *   </tr>
 *   <tr>
 *     <td><code>variant</code></td>
 *     <td><code>[[TYPES.Variant]]</code></td>
 *     <td><code>any</code></td>
 *     <td>✓</td>
 *     <td>-</td>
 *   </tr>
 *   <tr>
 *     <td><code>xml</code></td>
 *     <td><code>[[TYPES.Xml]]</code></td>
 *     <td><code>string</code></td>
 *     <td>✓</td>
 *     <td>-</td>
 *   </tr>
 * </tbody>
 * </table>
 *
 * <ol>
 *   <li>
 *     <h4>BigInt</h4>
 *     <p>
 *       Values are returned as a string. This is because values can exceed 53 bits of significant data, which is greater than a
 *       Javascript <code>number</code> type can represent as an integer.
 *     </p>
 *   </li>
 *   <li>
 *     <h4>Numerical, Decimal</h4>
 *     <p>
 *       For input parameters, default precision is 18 and default scale is 0. Maximum supported precision is 19.
 *     </p>
 *   </li>
 *   <li>
 *     <h4>VarChar, NVarChar</h4>
 *     <p>
 *       <code>varchar(max)</code> and <code>nvarchar(max)</code> are also supported.
 *     </p>
 *   </li>
 *   <li>
 *     <h4>UniqueIdentifier</h4>
 *     <p>
 *       Values are returned as a 16 byte hexadecimal string.
 *     </p>
 *     <p>
 *       Note that the order of bytes is not the same as the character representation. See
 *       <a href="http://msdn.microsoft.com/en-us/library/ms190215.aspx">Using uniqueidentifier Data</a>
 *       for an example of the different ordering of bytes.
 *     </p>
 *   </li>
 * </ol>
 */

exports.TYPE = TYPE;
const TYPES = {
  TinyInt: _tinyint.default,
  Bit: _bit.default,
  SmallInt: _smallint.default,
  Int: _int.default,
  SmallDateTime: _smalldatetime.default,
  Real: _real.default,
  Money: _money.default,
  DateTime: _datetime.default,
  Float: _float.default,
  Decimal: _decimal.default,
  Numeric: _numeric.default,
  SmallMoney: _smallmoney.default,
  BigInt: _bigint.default,
  Image: _image.default,
  Text: _text.default,
  UniqueIdentifier: _uniqueidentifier.default,
  NText: _ntext.default,
  VarBinary: _varbinary.default,
  VarChar: _varchar.default,
  Binary: _binary.default,
  Char: _char.default,
  NVarChar: _nvarchar.default,
  NChar: _nchar.default,
  Xml: _xml.default,
  Time: _time.default,
  Date: _date.default,
  DateTime2: _datetime2.default,
  DateTimeOffset: _datetimeoffset.default,
  UDT: _udt.default,
  TVP: _tvp.default,
  Variant: _sqlVariant.default
};
exports.TYPES = TYPES;
const typeByName = TYPES;
exports.typeByName = typeByName;