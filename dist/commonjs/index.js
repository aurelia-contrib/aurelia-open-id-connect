"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var open_id_connect_1 = require("./open-id-connect");
exports.OpenIdConnect = open_id_connect_1.OpenIdConnect;
var open_id_connect_roles_1 = require("./open-id-connect-roles");
exports.OpenIdConnectRoles = open_id_connect_roles_1.OpenIdConnectRoles;
// by convention, the plugin is named `configure`
var plugin_1 = require("./plugin");
exports.configure = plugin_1.configure;
