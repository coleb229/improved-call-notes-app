"use client"
import React, { useCallback } from 'react';
import ReactFlow, { useNodesState, useEdgesState, addEdge, Controls, ControlButton } from 'reactflow';

import 'reactflow/dist/style.css';

const initialNodes = [
  { id: '1', position: { x: 0, y: 0 }, data: { label: '1' } },
  { id: '2', position: { x: 0, y: 100 }, data: { label: '2' } },
  { id: '3', position: { x: 0, y: 200 }, data: { label: '3' } },
];
const initialEdges = [{ id: 'e1-3', source: '1', target: '3' }];

export default function Flow() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback((params:any) => setEdges((eds) => addEdge(params, eds)), [setEdges]);

  const changeLabel = (event:any, item:any) => {
    console.log(item, event.target.value);
    item.data.label = event.target.value;
    setNodes([...nodes]);
  };

  return (
    <div style={{ width: '90vw', height: '90vh', margin: 'auto' }} className='bg-white'>
      <ReactFlow
        defaultNodes={nodes}
        defaultEdges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
      >
        <Controls className='pb-24'>
          <ControlButton onClick={() => changeLabel}>
            🏷
          </ControlButton>
        </Controls>
      </ReactFlow>
    </div>
  );
}