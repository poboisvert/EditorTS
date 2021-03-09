const EventComponent: React.FC = () => {
  // Without Type inference
  // Mouse over onChange= to see more - VS Code
  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(event);
  };

  const onDragStart = (event: React.DragEvent<HTMLDivElement>) => {
    console.log(event);
  };
  return (
    <div>
      <input onChange={onChange} />
      <div draggable onDragStart={onDragStart}>
        Drag it, peasant. Move Weight!
      </div>
    </div>
  );
};

export default EventComponent;
