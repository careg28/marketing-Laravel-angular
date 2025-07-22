<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Project;

class ProjectController extends Controller
{
    // Lista todos los proyectos
    public function index()
    {
       return response()->json(Project::with('user')->get(), 200);
    }

    // Crea un nuevo proyecto
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'slug' => 'required|string|max:255|unique:projects',
            'description' => 'nullable|string',
            'sector' => 'nullable|string|max:255',
            'image' => 'nullable|string|max:255',
        ]);

        $project = Project::create($validated);

        return response()->json($project, 201);
    }

    // Muestra un proyecto específico
    public function show($id)
    {
        $project = Project::find($id);

        if (!$project) {
            return response()->json(['message' => 'Proyecto no encontrado'], 404);
        }

        return response()->json($project, 200);
    }

    // Actualiza un proyecto existente
    public function update(Request $request, $id)
    {
        $project = Project::find($id);

        if (!$project) {
            return response()->json(['message' => 'Proyecto no encontrado'], 404);
        }

        $validated = $request->validate([
            'name' => 'sometimes|required|string|max:255',
            'slug' => "sometimes|required|string|max:255|unique:projects,slug,$id",
            'description' => 'nullable|string',
            'sector' => 'nullable|string|max:255',
            'image' => 'nullable|string|max:255',
        ]);

        $project->update($validated);

        return response()->json($project, 200);
    }

    // Elimina un proyecto
    public function destroy($id)
    {
        $project = Project::find($id);

        if (!$project) {
            return response()->json(['message' => 'Proyecto no encontrado'], 404);
        }

        $project->delete();

        return response()->json(['message' => 'Proyecto eliminado'], 200);
    }
}
