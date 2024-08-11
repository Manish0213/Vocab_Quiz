import React, { useEffect, useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  deleteFolder,
  fetchAllFolders,
  addFolder,
  updateFolder
} from "../app/features/folder/folderslice";

const FolderList = ({ showAlert }) => {
  const navigate = useNavigate();

  const [folderName, setFolderName] = useState("");
  const [folderDelId, setFolderDelId] = useState(null);
  const [editFolderId, setEditFolderId] = useState(null);
  const [editFolderName, setEditFolderName] = useState("");

  const dispatch = useDispatch();
  const folders = useSelector((state) => state.folder.folders);

  const modalCloseRef = useRef();
  const editModalCloseRef = useRef();

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
    } else {
      dispatch(fetchAllFolders());
    }
  }, []);

  const handleAddFolder = async (e) => {
    e.preventDefault();

    // Check if folder name is empty
    if (folderName.trim() === "") {
      showAlert("Folder name cannot be empty!", "danger");
      return;
    }

    // Check if folder name already exists
    if (
      folders.some(
        (folder) => folder.name.toLowerCase() === folderName.toLowerCase()
      )
    ) {
      showAlert("Folder name already exists!", "danger");
    } else {
      await dispatch(addFolder(folderName)).unwrap();
      showAlert("Folder Created Scuccessfully!", "success");
      setFolderName("");
      modalCloseRef.current.click();
    }
  };

  const handleDeleteClick = (id) => {
    setFolderDelId(id);
  };

  const handleDeleteFolder = async () => {
    await dispatch(deleteFolder(folderDelId)).unwrap();
    showAlert("Folder Deleted Scuccessfully!", "success");
  };

  const handleEditClick = (id, name) => {
    setEditFolderId(id);
    setEditFolderName(name);
  };

  const handleUpdateFolder = async (e) => {
    e.preventDefault();
    
    if (editFolderName.trim() === "") {
      showAlert("Folder name cannot be empty!", "danger");
      return;
    }

    if (
      folders.some(
        (folder) =>
          folder.name.toLowerCase() === editFolderName.toLowerCase() &&
          folder._id !== editFolderId
      )
    ) {
      showAlert("Folder name already exists!", "danger");
    } else {
      await dispatch(
        updateFolder({ id: editFolderId, name: editFolderName })
      ).unwrap();
      showAlert("Folder Updated Successfully!", "success");
      editModalCloseRef.current.click();
    }
  };

  return (
    <>
      <div className="folderlist">
        {folders.map((folder) => (
          <div className="folder">
            <Link
              to={`/vocabularylist/${folder._id}`}
              style={{ textDecoration: "none", color: "black" }}
            >
              <div className="folderIcon">
                <i class="fas fa-folder"></i>
                <p style={{ textAlign: "center" }}>{folder.name}</p>
              </div>
            </Link>
            <div className="folderOption">
              <i
                class="fas fa-edit"
                data-bs-target="#updateModal"
                data-bs-toggle="modal"
                onClick={() => handleEditClick(folder._id, folder.name)}
              ></i>
              <i
                class="fa-solid fa-trash"
                data-bs-target="#exampleModal"
                data-bs-toggle="modal"
                onClick={() => handleDeleteClick(folder._id)}
              ></i>
            </div>
          </div>
        ))}
        <div
          className="folder createFolder"
          data-bs-target="#CreateFolderModal"
          data-bs-toggle="modal"
        >
          <i class="fa-solid fa-folder-plus"></i>
        </div>
      </div>

      <div class="modal" tabindex="-1" id="CreateFolderModal">
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">Make Folder</h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <form onSubmit={handleAddFolder}>
                <div class="mb-3">
                  <label for="exampleInputEmail1" class="form-label">
                    Enter Folder Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="folderName"
                    value={folderName}
                    onChange={(e) => setFolderName(e.target.value)}
                    required
                  />
                </div>
              </form>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-bs-dismiss="modal"
                ref={modalCloseRef}
              >
                Close
              </button>
              <button
                type="button"
                class="btn btn-primary"
                data-bs-dismiss="modal"
                onClick={(e) => handleAddFolder(e)}
              >
                Create Folder
              </button>
            </div>
          </div>
        </div>
      </div>

      <div class="modal" tabindex="-1" id="exampleModal">
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">Delete Folder</h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                class="btn btn-danger"
                data-bs-dismiss="modal"
                onClick={handleDeleteFolder}
              >
                delete folder
              </button>
            </div>
          </div>
        </div>
      </div>

      <div class="modal" tabindex="-1" id="updateModal">
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">Edit Folder Name</h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                ref={editModalCloseRef}
              ></button>
            </div>
            <div class="modal-body">
              <form onSubmit={handleUpdateFolder}>
                <div class="mb-3">
                  <label for="exampleInputEmail1" class="form-label">
                    Enter Folder Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="editFolderName"
                    value={editFolderName}
                    onChange={(e) => setEditFolderName(e.target.value)}
                    required
                  />
                </div>
              </form>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button type="button" class="btn btn-primary" onClick={(e) => handleUpdateFolder(e)}>
                Rename
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FolderList;
