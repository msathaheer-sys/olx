import React, { Fragment, useContext, useState } from 'react';
import './Create.css';
import Header from '../Header/Header';
import { AuthContext } from '../../store/Context';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { storage } from '../../firebase/config';
import { ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db } from '../../firebase/config';
import { collection, addDoc } from 'firebase/firestore';

const Create = () => {
  const { user } = useContext(AuthContext);
  const history = useHistory();
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState(null);
  const date = new Date();
  const handleSubmit = async () => {
    if (!image) return;
    try {
      const storageReference = storageRef(storage, `/image/${image.name}`);
      const snapshot = await uploadBytes(storageReference, image);
      const url = await getDownloadURL(snapshot.ref);
      await addDoc(collection(db, 'Products'), {
        name,
        category,
        price,
        url,
        userId: user ? user.uid : null,
        createdAt: date.toDateString()
      });
      history.push('/');
    } catch (err) {
      console.error('Upload error', err);
    }
  }
  return (
    <Fragment>
      <Header />
      <card>
        <div className="centerDiv">
          <label htmlFor="fname">Name</label>
          <br />
          <input
            className="input"
            type="text"
            id="fname"
            name="Name"
            onChange={(e) => setName(e.target.value)}
          />
          <br />
          <label htmlFor="fname">Category</label>
          <br />
          <input
            className="input"
            type="text"
            id="fname"
            name="category"
            onChange={(e) => setCategory(e.target.value)}
          />
          <br />
          <label htmlFor="fname">Price</label>
          <br />
          <input className="input" type="number" id="fname" name="Price" onChange={(e) => setPrice(e.target.value)} />
          <br />
          <br />
          <img alt="Posts" width="200px" height="200px" src={image ? URL.createObjectURL(image) : ''}></img>
          <br />
          <input onChange={(e) => {
            setImage(e.target.files[0]);
          }} type="file" />
          <br />
          <button onClick={handleSubmit} className="uploadBtn">upload and Submit</button>
        </div>
      </card>
    </Fragment>
  );
};

export default Create;





// import React, { Fragment, useContext, useState } from 'react';
// import './Create.css';
// import Header from '../Header/Header';
// import { AuthContext, FirebaseContext } from '../../store/Context';
// import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
// import { ref } from 'firebase/storage';

// const Create = () => {
//   const {firebase} =useContext(FirebaseContext);
//   const { user } = useContext(AuthContext);
//   const history = useHistory();
//   const [name, setName] = useState('');
//   const [category, setCategory] = useState('');
//   const [price, setPrice] = useState('');
//   const [image, setImage] = useState(null);
//   const date= new Date();
//   const handleSubmit = () =>{
//     firebase.storage().ref(`/image/${image.name}`).put(image).then(({ref})=>{
//       ref.getDownloadURL().then((url)=>{
//         console.log(url);
//         firebase.firestore().collection('Products').add({
//           name,
//           category,
//           price,
//           url,
//           userId:user.uid,
//           createdAt:date.toDateString()
//         })
//         history.push('/')
//       })
//     })
//   }
//   return (
//     <Fragment>
//       <Header />
//       <card>
//         <div className="centerDiv">
//             <label htmlFor="fname">Name</label>
//             <br />
//             <input
//               className="input"
//               type="text"
//               id="fname"
//               name="Name"
//               onChange={(e) => setName(e.target.value)}
//             />
//             <br />
//             <label htmlFor="fname">Category</label>
//             <br />
//             <input
//               className="input"
//               type="text"
//               id="fname"
//               name="category"
//               onChange={(e) => setCategory(e.target.value)}
//             />
//             <br />
//             <label htmlFor="fname">Price</label>
//             <br />
//             <input className="input" type="number" id="fname" name="Price" onChange={(e) => setPrice(e.target.value)} />
//             <br />
//           <br />
//           <img alt="Posts" width="200px" height="200px" src={image ? URL.createObjectURL(image) : ''}></img>
//             <br />
//             <input onChange={(e) => {
//                setImage(e.target.files[0]);
//           }} type="file" />
//             <br />
//             <button onClick={handleSubmit} className="uploadBtn">upload and Submit</button>
//         </div>
//       </card>
//     </Fragment>
//   );
// };

// export default Create;