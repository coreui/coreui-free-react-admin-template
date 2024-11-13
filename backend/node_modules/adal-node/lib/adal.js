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

var _ = require('underscore');

var ac = require('./authentication-context');
var authParams = require('./authentication-parameters');
var logging = require('./log');
var MemoryCache = require('./memory-cache');

exports = {};

exports.Logging = logging.Logging;
exports.AuthenticationContext = ac.AuthenticationContext;
exports.setGlobalADALOptions = ac.setGlobalADALOptions;
exports.getGlobalADALOptions = ac.getGlobalADALOptions;
exports.MemoryCache = MemoryCache;
_.extend(exports, authParams);

/**
 * Creates a new AuthenticationContext object.  By default the authority will be checked against
 * a list of known Azure Active Directory authorities.  If the authority is not recognized as
 * one of these well known authorities then token acquisition will fail.  This behavior can be
 * turned off via the validateAuthority parameter below.
 * @function
 * @param {string}  authority            A URL that identifies a token authority.
 * @param {bool}    [validateAuthority]  Turns authority validation on or off.  This parameter default to true.
 * @returns {AuthenticationContext}      A new authentication context.
 */
exports.createAuthenticationContext = function(authority, validateAuthority) {
  return new ac.AuthenticationContext(authority, validateAuthority);
};

module.exports = exports;
