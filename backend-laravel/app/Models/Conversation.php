<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Conversation extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'subject',
    ];

    // Relación con el usuario que inicia la conversación
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    // Relación con los mensajes de la conversación
    public function messages()
    {
        return $this->hasMany(ContactMessage::class);
    }

    public function lastMessage()
    {
    // latestOfMany() obtiene el mensaje más reciente
    return $this->hasOne(\App\Models\ContactMessage::class)->latestOfMany();
    }
}

