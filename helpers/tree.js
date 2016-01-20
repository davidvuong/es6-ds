#!/usr/bin/env node
/**
 * es6-ds/helpers/tree.js
 *
 * Copyright (c) 2015 David Vuong <david.vuong256@gmail.com>
 * Licensed MIT
 */
'use strict';

/* Converts a max 2-child tree (binary tree) into DOT (GraphViz). */
function _2c_tree(tree) {
    let [hidden, queue] = [0, [[null, tree.root]]];

    console.log('graph {');
    console.log('  graph [ordering=out];');
    console.log('  node [shape=circle];');
    while (queue.length) {
        let [parent, current] = queue.shift();
        if (!parent) {
            console.log(`  ${current.data};`);
        } else if (!current) {
            console.log(`  _${hidden} [shape=point];`);
            console.log(`  ${parent.data} -- _${hidden};`);

            hidden++;
        } else {
            console.log(`  ${parent.data} -- ${current.data};`);
        }

        // Ignore leaf or `null` nodes.
        if (current && (current.left || current.right)) {
            queue.push([current, current.left]);
            queue.push([current, current.right]);
        }
    }
    console.log('}');
}

// TODO: Make all trees generic enough so that we just have 1 function (tree2dot).
export function bst2dot(tree) {
    if (!tree.size) { return null; }
    return _2c_tree(tree, tree.root);
}
