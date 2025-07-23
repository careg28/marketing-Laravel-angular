<?php
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\Api\PackageController;
use App\Http\Controllers\Api\ProjectController;
use App\Http\Controllers\Api\ServiceController;
use App\Http\Controllers\Api\TestimonialController;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\ConversationController;
use App\Http\Controllers\Api\ContactMessageController;
use App\Http\Controllers\Api\ContactController;
use Illuminate\Auth\Events\Verified;



// --- Rutas de autenticación ---
Route::post('login', [AuthController::class, 'login']);
Route::middleware('auth:sanctum')->post('logout', [AuthController::class, 'logout']);
Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

// --- Rutas protegidas ---
Route::middleware('auth:sanctum')->group(function () {
    Route::apiResource('users', UserController::class);
    Route::apiResource('projects', ProjectController::class);
    Route::apiResource('services', ServiceController::class);
    Route::apiResource('testimonials', TestimonialController::class);
    // (Opcional) puedes meter las conversaciones aquí si solo deben ser privadas
});

// --- Conversaciones y Mensajes (públicas o protegidas según tu lógica) ---

// Conversaciones (lista, detalle, crear)
Route::get('conversations', [ConversationController::class, 'index']);
Route::get('conversations/{conversation}', [ConversationController::class, 'show']);
Route::post('conversations', [ConversationController::class, 'store']);

// Mensajes de una conversación (lista y crear)
Route::get('conversations/{conversation}/messages', [ContactMessageController::class, 'index']);
Route::post('conversations/{conversation}/messages', [ContactMessageController::class, 'store']);

//paquetes
Route::get('packages', [PackageController::class, 'index']);
Route::get('packages/{package}', [PackageController::class, 'show']);
Route::post('packages', [PackageController::class, 'store']);
Route::put('packages/{package}', [PackageController::class, 'update']);
Route::patch('packages/{package}', [PackageController::class, 'update']);
Route::delete('packages/{package}', [PackageController::class, 'destroy']);

//paquetes + caracteristicas:
Route::apiResource('package-features', PackageFeatureController::class);

//formulario contacto
Route::post('/contacts', [ContactController::class, 'store']);
Route::get('/contacts', [ContactController::class, 'index']);

//registro
Route::post('registro', [AuthController::class, 'register']);

//verificacion correo electronico
// Ruta para enviar el enlace de verificación
Route::middleware('auth:sanctum')->post('/email/verification-notification', function (Request $request) {
    $request->user()->sendEmailVerificationNotification();
    return response()->json(['message' => 'Enlace de verificación enviado.']);
});

// Ruta para verificar el correo
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





    
