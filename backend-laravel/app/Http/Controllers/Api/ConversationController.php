<?php
namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Conversation;

class ConversationController extends Controller
{
    // Lista todas las conversaciones (puedes paginar si quieres)
    public function index()
    {
        return Conversation::with(['user', 'lastMessage'])->latest()->get();
        
    }

    // Muestra los datos de una conversación específica
    public function show($id)
    {
        return Conversation::with(['user', 'messages.user'])->findOrFail($id);
    }

    // Crea una nueva conversación
    public function store(Request $request)
    {
        $validated = $request->validate([
            'user_id' => 'nullable|exists:users,id',
            'subject' => 'nullable|string|max:255',
        ]);

        $conversation = Conversation::create($validated);
        return response()->json($conversation, 201);
    }
}