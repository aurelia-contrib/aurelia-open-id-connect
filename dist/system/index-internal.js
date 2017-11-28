System.register(["./open-id-connect-authorize-step", "./open-id-connect-configuration-manager", "./open-id-connect-factory", "./open-id-connect-logger", "./open-id-connect-navigation-strategies", "./open-id-connect-routing", "./open-id-connect-user-block", "./open-id-connect-user-debug"], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var open_id_connect_authorize_step_1, open_id_connect_configuration_manager_1, open_id_connect_factory_1, open_id_connect_logger_1, open_id_connect_navigation_strategies_1, open_id_connect_routing_1, open_id_connect_user_block_1, open_id_connect_user_debug_1;
    return {
        setters: [
            function (open_id_connect_authorize_step_1_1) {
                open_id_connect_authorize_step_1 = open_id_connect_authorize_step_1_1;
            },
            function (open_id_connect_configuration_manager_1_1) {
                open_id_connect_configuration_manager_1 = open_id_connect_configuration_manager_1_1;
            },
            function (open_id_connect_factory_1_1) {
                open_id_connect_factory_1 = open_id_connect_factory_1_1;
            },
            function (open_id_connect_logger_1_1) {
                open_id_connect_logger_1 = open_id_connect_logger_1_1;
            },
            function (open_id_connect_navigation_strategies_1_1) {
                open_id_connect_navigation_strategies_1 = open_id_connect_navigation_strategies_1_1;
            },
            function (open_id_connect_routing_1_1) {
                open_id_connect_routing_1 = open_id_connect_routing_1_1;
            },
            function (open_id_connect_user_block_1_1) {
                open_id_connect_user_block_1 = open_id_connect_user_block_1_1;
            },
            function (open_id_connect_user_debug_1_1) {
                open_id_connect_user_debug_1 = open_id_connect_user_debug_1_1;
            }
        ],
        execute: function () {
            exports_1("OpenIdConnectAuthorizeStep", open_id_connect_authorize_step_1.OpenIdConnectAuthorizeStep);
            exports_1("OpenIdConnectConfigurationManager", open_id_connect_configuration_manager_1.OpenIdConnectConfigurationManager);
            exports_1("OpenIdConnectFactory", open_id_connect_factory_1.OpenIdConnectFactory);
            exports_1("OpenIdConnectLogger", open_id_connect_logger_1.OpenIdConnectLogger);
            exports_1("OpenIdConnectNavigationStrategies", open_id_connect_navigation_strategies_1.OpenIdConnectNavigationStrategies);
            exports_1("OpenIdConnectRouting", open_id_connect_routing_1.OpenIdConnectRouting);
            exports_1("OpenIdConnectUserBlock", open_id_connect_user_block_1.OpenIdConnectUserBlock);
            exports_1("OpenIdConnectUserDebug", open_id_connect_user_debug_1.OpenIdConnectUserDebug);
        }
    };
});
