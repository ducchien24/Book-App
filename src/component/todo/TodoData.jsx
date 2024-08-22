export default function TodoData(props) {
  const { valueData, handClickDelete } = props;

  return (
    <div className="todo-data">
        {valueData.map((item) => {
          console.log(item);
          return (
            <div key={item.id} className="show-task">
              <div> {item.value} </div>
              <div>
                <button className="btn btn-edit">Edit</button>
                <button
                  className="btn btn-delete"
                  onClick={() => handClickDelete(item.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          );
        })}
    </div>
  );
}
