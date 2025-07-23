<?php


namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;

use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    // Listar todos los usuarios (admin)
    public function index()
    {
        return User::all();
    }

    // Mostrar un usuario específico
    public function show($id)
    {
        return User::findOrFail($id);
    }

    // Crear usuario (registro)
    public function store(Request $request)
    {
        $request->validate([
            'name'=>'required',
            'email'=>'required|email|unique:users',
            'tel' => 'nullable|string|max:20',
            'password'=>'required|min:6',
            'role'=>'required'
        ]);

        $user = User::create([
            'name'=>$request->name,
            'email'=>$request->email,
            'tel' => $request->tel,
            'password'=>bcrypt($request->password),
            'role'=>$request->role,
        ]);
        return response()->json($user, 201);
    }

    // Actualizar usuario
    public function update(Request $request, $id)
    {
        $user = User::findOrFail($id);
        $user->update($request->all());
        return $user;
    }

    // Eliminar usuario
    public function destroy($id)
    {
        return User::destroy($id);
    }
}
