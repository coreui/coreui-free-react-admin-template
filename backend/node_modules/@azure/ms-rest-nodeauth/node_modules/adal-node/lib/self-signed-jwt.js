/*
 * @copyright
 * Copyright © Microsoft Open Technologies, Inc.
 *
 * All Rights Reserved
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http: *www.apache.org/licenses/LICENSE-2.0
 *
 * THIS CODE IS PROVIDED *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS
 * OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION
 * ANY IMPLIED WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A
 * PARTICULAR PURPOSE, MERCHANTABILITY OR NON-INFRINGEMENT.
 *
 * See the Apache License, Version 2.0 for the specific language
 * governing permissions and limitations under the License.
 */
'use strict';

var jwtConstants = require('./constants').Jwt;
var Logger = require('./log').Logger;
var util = require('./util');

require('date-utils');
var jws = require('jws');
var uuid = require('uuid');

/**
 * JavaScript dates are in milliseconds, but JWT dates are in seconds.
 * This function does the conversion.
 * @param  {Date}   date
 * @return {string}
 */
function dateGetTimeInSeconds(date) {
  return Math.floor(date.getTime()/1000);
}

/**
 * Constructs a new SelfSignedJwt object.
 * @param {object}    callContext    Context specific to this token request.
 * @param {Authority} authority      The authority to be used as the JWT audience.
 * @param {string}    clientId       The client id of the calling app.
 */
function SelfSignedJwt(callContext, authority, clientId) {
  this._log = new Logger('SelfSignedJwt', callContext._logContext);
  this._callContext = callContext;

  this._authority = authority;
  this._tokenEndpoint = authority.tokenEndpoint;
  this._clientId = clientId;
}

/**
 * This wraps date creation in order to make unit testing easier.
 * @return {Date}
 */
SelfSignedJwt.prototype._getDateNow = function() {
  return new Date();
};

SelfSignedJwt.prototype._getNewJwtId = function() {
  return uuid.v4();
};

/**
 * A regular certificate thumbprint is a hex encode string of the binary certificate
 * hash.  For some reason teh x5t value in a JWT is a url save base64 encoded string
 * instead.  This function does the conversion.
 * @param  {string} thumbprint  A hex encoded certificate thumbprint.
 * @return {string} A url safe base64 encoded certificate thumbprint.
 */
SelfSignedJwt.prototype._createx5tValue = function(thumbprint) {
    var hexString = thumbprint.replace(/:/g, '').replace(/ /g, '');
    var base64 = (new Buffer(hexString, 'hex')).toString('base64');
    return util.convertRegularToUrlSafeBase64EncodedString(base64);
};

/**
 * Creates the JWT header.
 * @param  {string} thumbprint  A hex encoded certificate thumbprint.
 * @return {object}
 */
SelfSignedJwt.prototype._createHeader = function(thumbprint) {
  var x5t = this._createx5tValue(thumbprint);
  var header = { typ: 'JWT', alg: 'RS256', x5t : x5t };

  this._log.verbose('Creating self signed JWT header');
  this._log.verbose('Creating self signed JWT header.  x5t: ' + x5t, true);

  return header;
};

/**
 * Creates the JWT payload.
 * @return {object}
 */
SelfSignedJwt.prototype._createPayload = function() {
  var now = this._getDateNow();
  var expires = (new Date(now.getTime())).addMinutes(jwtConstants.SELF_SIGNED_JWT_LIFETIME);

  this._log.verbose('Creating self signed JWT payload.  Expires: ' + expires + ' NotBefore: ' + now);

  var jwtPayload = {};
  jwtPayload[jwtConstants.AUDIENCE] = this._tokenEndpoint;
  jwtPayload[jwtConstants.ISSUER] = this._clientId;
  jwtPayload[jwtConstants.SUBJECT] = this._clientId;
  jwtPayload[jwtConstants.NOT_BEFORE] = dateGetTimeInSeconds(now);
  jwtPayload[jwtConstants.EXPIRES_ON] = dateGetTimeInSeconds(expires);
  jwtPayload[jwtConstants.JWT_ID] = this._getNewJwtId();

  return jwtPayload;
};

SelfSignedJwt.prototype._throwOnInvalidJwtSignature = function(jwt) {
  var jwtSegments = jwt.split('.');

  if (3 > jwtSegments.length || !jwtSegments[2]) {
    throw this._log.createError('Failed to sign JWT.  This is most likely due to an invalid certificate.');
  }

  return;
};

SelfSignedJwt.prototype._signJwt = function(header, payload, certificate) {
  var jwt;
  try {
     jwt = jws.sign({ header : header, payload : payload, secret : certificate });
  }
  catch (err) {
     this._log.error(err, true);
     throw this._log.createError('Failed to sign JWT.This is most likely due to an invalid certificate.');   
  }
  
  this._throwOnInvalidJwtSignature(jwt);
  return jwt;
};

SelfSignedJwt.prototype._reduceThumbprint = function(thumbprint) {
    var canonical = thumbprint.toLowerCase().replace(/ /g, '').replace(/:/g, '');
    this._throwOnInvalidThumbprint(canonical);
    return canonical;
};

var numCharIn128BitHexString = 128/8*2;
var numCharIn160BitHexString = 160/8*2;
var thumbprintSizes  = {};
thumbprintSizes[numCharIn128BitHexString] = true;
thumbprintSizes[numCharIn160BitHexString] = true;
var thumbprintRegExp = /^[a-f\d]*$/;

SelfSignedJwt.prototype._throwOnInvalidThumbprint = function(thumbprint) {
  if (!thumbprintSizes[thumbprint.length] || !thumbprintRegExp.test(thumbprint)) {
    throw this._log.createError('The thumbprint does not match a known format');
  }
};

/**
 * Creates a self signed JWT that can be used as a client_assertion.
 * @param  {string}  certificate   A PEM encoded certificate private key.
 * @param  {string}  thumbprint    A hex encoded thumbprint of the certificate.
 * @return {string}  A self signed JWT token.
 */
SelfSignedJwt.prototype.create = function(certificate, thumbprint) {
  thumbprint = this._reduceThumbprint(thumbprint);
  var header = this._createHeader(thumbprint);

  var payload = this._createPayload();

  var jwt = this._signJwt(header, payload, certificate);
  return jwt;
};

module.exports = SelfSignedJwt;