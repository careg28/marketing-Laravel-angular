<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreContactRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        /*$ip = Request::ip();
    $key = 'contact_form_' . $ip;
    $limitInSeconds = 300; // por ejemplo, 5 minutos

    if (Cache::has($key)) {
        return false; // Ya envió recientemente
    }

    Cache::put($key, true, $limitInSeconds);*/
    return true;

    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules()
    {
        return [
            'name' => 'required|string|min:2|max:100',
            'tel' => 'nullable|string|min:6|max:15', //
            'email' => 'required|email|max:120',
            'message' => 'required|string|min:40|max:800'
        ];
    }

    public function messages(): array
    {
        return [
            'name.required' => 'Por favor, escribe tu nombre.',
            'message.min' => 'Tu mensaje debe tener al menos 40 caracteres.'
        ];
    }

    
}
