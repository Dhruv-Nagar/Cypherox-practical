import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Button, Card, CardContent, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, Typography } from '@mui/material';
import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';

const TableComponent = () => {
  // Sample data
  const [columns, setColumns] = useState({
    column1: {
      id: '1',
      title: 'To Do',
      rows: [
        { id: '1', content: 'Row 1 - Column 1', taskName: "" }
        // Add more rows as needed
      ],
    },
    column2: {
      id: '2',
      title: 'In Progress',
      rows: [
        // { id: '1', content: 'Row 1 - Column 2', taskName: "" },
        // Add more rows as needed
      ],
    },
    column3: {
      id: '3',
      title: 'Completed',
      rows: [
        // { id: '1', content: 'Row 1 - Column 3', taskName: "" },
        // Add more rows as needed
      ],
    },
  });
  const [showEditIcon, setShowEditIcon] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(null)

  // Function to handle drag and drop
  const handleDragEnd = (result) => {
    const { source, destination } = result;

    // If dropped outside the list
    if (!destination) return;

    // If dropped in the same column and position
    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) return;

    const sourceColumn = columns[source.droppableId];
    const destinationColumn = columns[destination.droppableId];

    const sourceRows = [...sourceColumn.rows];
    const destinationRows = [...destinationColumn.rows];

    // Remove from source column
    const [draggedRow] = sourceRows.splice(source.index, 1);
    // Insert into destination column
    destinationRows.splice(destination.index, 0, draggedRow);

    // Update state
    setColumns({
      ...columns,
      [source.droppableId]: {
        ...sourceColumn,
        rows: sourceRows,
      },
      [destination.droppableId]: {
        ...destinationColumn,
        rows: destinationRows,
      },
    });
  };

  const handleChange = (value, col, row) => {
    console.log('value', value)
    console.log('col', col)
    console.log('row', row)
  }

  // const handleAddTask=(columnId)=>{
  //   {Object.values(columns).map((column) => {
  //       if (column.id==columnId) {
          
  //         setColumns({...columns, rows: [{ id: '1', content: 'Row 1 - Column 1', taskName: "" }]})
  //       }
  //     })
  // }}
  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div style={{ display: 'flex' }}>
        {Object.values(columns).map((column) => (
          <div key={column.id} style={{ margin: 8 }}>
            <Card className="board-card">
              <CardContent>
                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                  {column.title}
                </Typography>
                <Droppable droppableId={column.id}>
                  {(provided) => (
                    <div
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                      style={{
                        border: '1px solid lightgrey',
                        padding: 8,
                        width: 250,
                        minHeight: 100,
                      }}
                    >
                      {column?.rows?.map((row, index) => (
                        <Draggable key={row.id} draggableId={row.id} index={index}>
                          {(provided) => (
                            <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined"
                              onMouseEnter={() => {
                                setShowEditIcon(true)
                                setCurrentIndex(column.id + row.id)
                              }}
                              onMouseLeave={() => setShowEditIcon(false)}
                            >
                              <OutlinedInput
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                id="outlined-adornment-password"
                                type={'text'}
                                onChange={(e) => handleChange(e.target.value, column.id, row.id)}
                                placeholder='Enter Task'
                                style={{ ...provided.draggableProps.style }}
                                endAdornment={
                                  <InputAdornment position="end">
                                    <IconButton
                                      aria-label="toggle password visibility"
                                      edge="end"
                                    >
                                      {showEditIcon && currentIndex == column.id + row.id ? <EditIcon /> : null}
                                    </IconButton>
                                  </InputAdornment>
                                }

                              />
                            </FormControl>
                          )}
                        </Draggable>
                      ))}
                      <Button variant="outlined"  startIcon={<AddIcon />}>
                        Add Task
                      </Button>
                    </div>
                  )}
                </Droppable>
              </CardContent>
            </Card>
          </div>
        ))}
      </div>
    </DragDropContext>
  );
};

export default TableComponent;
