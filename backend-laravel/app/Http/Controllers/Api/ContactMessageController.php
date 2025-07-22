<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\ContactMessage;

class ContactMessageController extends Controller
{
    // Mensajes de una conversación
    public function index($conversationId)
    {
        return ContactMessage::with('user')
            ->where('conversation_id', $conversationId)
            ->orderBy('created_at')
            ->get();
    }

    // Nuevo mensaje en una conversación
    public function store(Request $request, $conversationId)
    {
        $validated = $request->validate([
            'user_id' => 'nullable|exists:users,id',
            'message' => 'required|string|min:1',
            'is_admin' => 'boolean'
        ]);

        $data = $validated;
        $data['conversation_id'] = $conversationId;

        $msg = ContactMessage::create($data);

        return response()->json($msg, 201);
    }
}
