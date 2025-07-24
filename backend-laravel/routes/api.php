<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Illuminate\Auth\Events\Verified;

// Controladores
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\Api\ProjectController;
use App\Http\Controllers\Api\ServiceController;
use App\Http\Controllers\Api\TestimonialController;
use App\Http\Controllers\Api\PackageController;
use App\Http\Controllers\Api\PackageFeatureController;
use App\Http\Controllers\Api\ConversationController;
use App\Http\Controllers\Api\ContactMessageController;
use App\Http\Controllers\Api\ContactController;

//
// ─── RUTAS PÚBLICAS ──────────────────────────────────────────────────────────────
//

// Autenticación pública (login, registro)
Route::post('login', [AuthController::class, 'login']);
Route::post('registro', [AuthController::class, 'register']);

// Consulta de paquetes (pública)
Route::get('packages', [PackageController::class, 'index']);
Route::get('packages/{package}', [PackageController::class, 'show']);

// Conversaciones y mensajes públicas
Route::get('conversations', [ConversationController::class, 'index']);
Route::get('conversations/{conversation}', [ConversationController::class, 'show']);
Route::post('conversations', [ConversationController::class, 'store']);
Route::get('conversations/{conversation}/messages', [ContactMessageController::class, 'index']);
Route::post('conversations/{conversation}/messages', [ContactMessageController::class, 'store']);

// Contacto (formulario público)
Route::post('/contacts', [ContactController::class, 'store']);
Route::get('/contacts', [ContactController::class, 'index']);  

// Verificación de email por enlace firmado
Route::get('/email/verify/{id}/{hash}', function (Request $request, $id, $hash) {
    $user = \App\Models\User::findOrFail($id);

    if (! hash_equals((string) $hash, sha1($user->getEmailForVerification()))) {
        return response()->json(['message' => 'Enlace de verificación inválido'], 400);
    }

    if ($user->hasVerifiedEmail()) {
        return response()->json(['message' => 'El correo ya está verificado']);
    }

    $user->markEmailAsVerified();
    event(new Verified($user));

    return response()->json(['message' => 'Correo verificado con éxito']);
})->middleware(['signed'])->name('verification.verify');


//
// ─── RUTAS PROTEGIDAS (SESIONES AUTENTICADAS) ────────────────────────────────────
//

// Cerrar sesión
Route::middleware('auth:sanctum')->post('logout', [AuthController::class, 'logout']);

// Obtener datos del usuario actual
Route::middleware('auth:sanctum')->get('/user', fn (Request $request) => $request->user());

// Reenviar enlace de verificación de email
Route::middleware('auth:sanctum')->post('/email/verification-notification', function (Request $request) {
    $request->user()->sendEmailVerificationNotification();
    return response()->json(['message' => 'Enlace de verificación enviado.']);
});


//
// ─── ÁREA DE ADMINISTRACIÓN (ROL: ADMIN) ─────────────────────────────────────────
//

Route::middleware(['auth:sanctum', 'role:admin'])->group(function () {
    // CRUD completo de usuarios, proyectos, servicios, etc.
    Route::apiResource('users', UserController::class);
    Route::apiResource('projects', ProjectController::class);
    Route::apiResource('services', ServiceController::class);
    Route::apiResource('testimonials', TestimonialController::class);
    Route::apiResource('package-features', PackageFeatureController::class);
});

// 🔐 Protegidas — paquetes solo para admin
Route::middleware(['auth:sanctum', 'role:admin'])->group(function () {
    Route::post('packages', [PackageController::class, 'store']);
    Route::put('packages/{package}', [PackageController::class, 'update']);
    Route::patch('packages/{package}', [PackageController::class, 'update']);
    Route::delete('packages/{package}', [PackageController::class, 'destroy']);
  });
  

//
// ─── ÁREA DE USUARIOS REGISTRADOS (ROL: USER) ────────────────────────────────────
//

Route::middleware(['auth:sanctum', 'role:user'])->group(function () {
    // rutas específicas del usuario

});






    
