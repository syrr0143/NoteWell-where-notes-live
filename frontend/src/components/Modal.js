import React from 'react';

function Modal() {
 

  return (
   
 
<div className="modal fade modal-dialog modal-dialog-centered" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h1 className="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
       <form method='POST'>
                    <div className="mb-3">
                        <label htmlFor="title" className="form-label"><h4>Title</h4></label>
                        <input
                            type="text"
                            className="form-control"
                            id="title"
                            name="title"
                            placeholder="Enter your title here"
                            onChange={onchange}
                            value={state.title}
                        />
                    </div>
                    <label htmlFor="description" className="form-label"><h4>Description</h4></label>
                    <input
                        type="text"
                        id="description"
                        className="mb-3 form-control"
                        name="description"
                        placeholder="Description of note"
                        aria-describedby="passwordHelpBlock"
                        onChange={onchange}
                        value={state.description}
                    />
                    <label htmlFor="description" className=" form-label"><h4>Tag</h4></label>
                    <input 
                        type="text"
                        id="description"
                        className="mb-3 form-control"
                        name="tag"
                        placeholder="Tag something here"
                        aria-describedby="passwordHelpBlock"
                        onChange={onchange}
                        value={state.tag}
                    />
                    {error && <p className="text-danger">{error}</p>}
                    <button style={{ marginTop: "5vh" }} type='button' className='btn btn-success' onClick={handleSubmit}>Add Note</button>
                </form>
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" className="btn btn-primary">Save changes</button>
      </div>
    </div>
  </div>
</div>
  );
}

export default Modal;
