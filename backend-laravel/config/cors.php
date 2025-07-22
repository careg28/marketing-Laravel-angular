<?php

return [

    'paths' => ['api/*', 'sanctum/csrf-cookie'],

    'allowed_methods' => ['*'],

    'allowed_origins' => [
        'http://backend-laravel.test',
        'https://backend-laravel.test',
    ],

    'allowed_origins_patterns' => [
        '/^http:\/\/localhost:\d+$/',   // Permite cualquier puerto de localhost (Angular/Vite/React)
    ],

    'allowed_headers' => ['*'],

    'exposed_headers' => [],

    'max_age' => 0,

    'supports_credentials' => true, //  true si usas cookies, tokens o sesión

];
