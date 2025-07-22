<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Testimonial;

class TestimonialController extends Controller
{
    // Lista todos los testimonios
    public function index()
    {
        return response()->json(Testimonial::all(), 200);
    }

    // Crea un nuevo testimonio
    public function store(Request $request)
    {
        $validated = $request->validate([
            'project_id' => 'required|exists:projects,id',
            'author_name' => 'required|string|max:255',
            'content' => 'required|string',
            'rating' => 'nullable|integer|min:1|max:5',
        ]);

        $testimonial = Testimonial::create($validated);

        return response()->json($testimonial, 201);
    }

    // Muestra un testimonio específico
    public function show($id)
    {
        $testimonial = Testimonial::find($id);

        if (!$testimonial) {
            return response()->json(['message' => 'Testimonio no encontrado'], 404);
        }

        return response()->json($testimonial, 200);
    }

    // Actualiza un testimonio existente
    public function update(Request $request, $id)
    {
        $testimonial = Testimonial::find($id);

        if (!$testimonial) {
            return response()->json(['message' => 'Testimonio no encontrado'], 404);
        }

        $validated = $request->validate([
            'project_id' => 'sometimes|required|exists:projects,id',
            'author_name' => 'sometimes|required|string|max:255',
            'content' => 'sometimes|required|string',
            'rating' => 'nullable|integer|min:1|max:5',
        ]);

        $testimonial->update($validated);

        return response()->json($testimonial, 200);
    }

    // Elimina un testimonio
    public function destroy($id)
    {
        $testimonial = Testimonial::find($id);

        if (!$testimonial) {
            return response()->json(['message' => 'Testimonio no encontrado'], 404);
        }

        $testimonial->delete();

        return response()->json(['message' => 'Testimonio eliminado'], 200);
    }
}
