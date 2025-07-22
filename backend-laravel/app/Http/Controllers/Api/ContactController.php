<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Contact;
use App\Http\Requests\StoreContactRequest;


class ContactController extends Controller
{
    public function store(StoreContactRequest $request)
    {
        Contact::create($request->validated());
    
        return response()->json(['message' => 'Mensaje enviado con éxito'], 201);
    }

    // Obtener todos los contactos
    public function index()
    {
        $contacts = Contact::orderBy('created_at', 'desc')->get();

        return response()->json($contacts);
    }

}  



