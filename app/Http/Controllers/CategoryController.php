<?php

namespace App\Http\Controllers;

use App\Category;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    /**
     * List the resources.
     *
     * @return \Illuminate\Http\Response
     */
    public function list(Request $request)
    {
        $q = $request->q;
        $limit = $request->limit;

        $categories = Category::active()
            ->latest()
            // Search query
            ->when($q, function ($query) use ($q) {
                return $query->search($q);
            })
            ->paginate((int) $limit);

        return response()->json($categories);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        return response()->json([
            Category::find($id)
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $category = Category::findOrFail($id);

        return response()->json([
            'success' => $category->softDelete()
        ]);
    }
}
