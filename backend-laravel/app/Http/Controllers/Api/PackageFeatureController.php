<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use App\Models\PackageFeature;
use Illuminate\Http\Request;



class PackageFeatureController extends Controller
{
    public function index()
    {
        return PackageFeature::with('package')->get();
    }

    public function show($id)
    {
        return PackageFeature::with('package')->findOrFail($id);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'package_id' => 'required|exists:packages,id',
            'label' => 'required|string',
            'included' => 'boolean',
        ]);

        return PackageFeature::create($validated);
    }

    public function update(Request $request, $id)
    {
        $feature = PackageFeature::findOrFail($id);

        $validated = $request->validate([
            'label' => 'sometimes|required|string',
            'included' => 'sometimes|boolean',
        ]);

        $feature->update($validated);
        return $feature;
    }

    public function destroy($id)
    {
        return PackageFeature::destroy($id);
    }
}
