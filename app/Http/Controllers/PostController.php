<?php

namespace App\Http\Controllers;

use App\Post;
use Illuminate\Http\Request;

class PostController extends Controller
{
    /**
     * List the resources.
     *
     * @return \Illuminate\Http\Response
     */
    public function list(Request $request)
    {
        $paginator = Post::query()
            ->latest()
            ->paginate(16);

        return response()->json([
            'posts' => $paginator->items(),
            'hasMore' => $paginator->hasMorePages(),
            'currentPage' => $paginator->currentPage(),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function click(Request $request)
    {
        $post = Post::with('comments')->find($request->id);
        $post->increment('clicks');
        
        return response()->json([
            $post
        ]);
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
            Post::with('comments.users')->find($id)
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
        //
    }
}