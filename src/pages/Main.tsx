import React, { useEffect, useState } from 'react';
import '../styles/form.scss';
import { select_style } from '../components/select_styles';
import Select from 'react-select';
import { FileUploader } from "react-drag-drop-files";
const queryString = require('query-string');
import User from '../public/user.png';
import Company from '../public/company.png';

export const Main = () => {

  const [name, setName] = useState(null)
  const [surname, setSurname] = useState(null)
  const [image, setImage] = useState(User)
  const [type, setType] = useState(null)
  const [id, setId] = useState(null)
  const [submitDisabled, setSubmitDisabled] = useState(true)

  const type_options = [
    {
      value: 'person',
      label: 'Osoba'
    },
    {
      value: 'company',
      label: 'Firma'
    }
  ]

  const checkPesel = (e) => {
    let r = document.querySelector(':root') as HTMLElement

    if (e.target.value.length > 11) {
      e.target.value = parseInt(e.target.value.toString().slice(0, 11))
    }
    if (isValidPesel(e.target.value)) {
      setId(e.target.value)
      r.style.setProperty('--validation', '2px solid #478a47')
      r.style.setProperty('--validationfocus', '#478a47')
    }
    else {
      setId(null)
      r.style.setProperty('--validation', '2px solid #e76262')
      r.style.setProperty('--validationfocus', '#e76262')
    }
  }

  const checkNip = (e) => {
    let r = document.querySelector(':root') as HTMLElement

    if (e.target.value.length > 10) {
      e.target.value = parseInt(e.target.value.toString().slice(0, 10))
    }
    if (isValidNip(e.target.value)) {
      setId(e.target.value)
      r.style.setProperty('--validation', '2px solid #478a47')
      r.style.setProperty('--validationfocus', '#478a47')
    }
    else {
      setId(null)
      r.style.setProperty('--validation', '2px solid #e76262')
      r.style.setProperty('--validationfocus', '#e76262')
    }
  }

  const isValidPesel = (pesel) => {
    if (typeof pesel !== 'string')
      return false;

    let weight = [1, 3, 7, 9, 1, 3, 7, 9, 1, 3];
    let sum = 0;
    let controlNumber = parseInt(pesel.substring(10, 11));

    for (let i = 0; i < weight.length; i++) {
      sum += (parseInt(pesel.substring(i, i + 1)) * weight[i]);
    }
    sum = sum % 10;
    return (10 - sum) % 10 === controlNumber;
  }

  const isValidNip = (nip) => {
    if (typeof nip !== 'string')
      return false;

    nip = nip.replace(/[\ \-]/gi, '');

    let weight = [6, 5, 7, 2, 3, 4, 5, 6, 7];
    let sum = 0;
    let controlNumber = parseInt(nip.substring(9, 10));
    let weightCount = weight.length;
    for (let i = 0; i < weightCount; i++) {
      sum += (parseInt(nip.substr(i, 1)) * weight[i]);
    }

    return sum % 11 === controlNumber;
  }

  const changeType = (element) => {
    let r = document.querySelector(':root') as HTMLElement
    r.style.setProperty('--validation', '2px solid #9b9b9b')
    r.style.setProperty('--validationfocus', '#3a7470')
    setType(element.value)
    setId(null)
    if (element.value == 'person') {
      setImage(User)
    }
    else if (element.value == 'company') {
      setImage(Company)
    }
  }

  const handleUpload = (file) => {
    setImage(URL.createObjectURL(file))
  }

  const idType = () => {
    if (type == 'person') {
      return (
        <div className="form__group field" style={{ opacity: 1 }}>
          <input key={1} type="number" className="form__field pesel" placeholder="Pesel" name="pesel" id='pesel' onChange={(e) => checkPesel(e)} />
          <label htmlFor="pesel" className="form__label">Pesel</label>
        </div>
      )
    }
    else if (type == 'company') {
      return (
        <div className="form__group field" style={{ opacity: 1 }}>
          <input key={2} type="number" className="form__field nip" placeholder="NIP" name="nip" id='nip' onChange={(e) => checkNip(e)} />
          <label htmlFor="nip" className="form__label">NIP</label>
        </div>
      )
    }
    else {
      return <></>
    }
  }

  const handleSubmit = () => {

    let data = queryString.stringify({
      name: name,
      surname: surname,
      type: type,
      id: id,
      image: image
    })

    fetch("https://localhost:60001/Contractor/Save", {
      method: "POST",
      body: data
    })
  }

  useEffect(() => {
    if (name && surname && type && id && (image != User && image != Company)) {
      setSubmitDisabled(false)
    }
    else {
      setSubmitDisabled(true)
    }
  }, [name, surname, image, type, id])

  return (
    <div className="form_container">
      <h1>Formularz Kontrahenta</h1>
      <div className='image'><img src={image} alt="" /></div>
      <Select
        options={type_options}
        styles={select_style}
        onChange={(e) => changeType(e)}
        placeholder={'Wybierz typ...'}
      />
      <div className="form__group field">
        <input type="input" className="form__field" placeholder="Imię" name="name" id='name' onChange={(e) => {
          e.target.value = e.target.value.replace(/[^a-zA-Z]+/g, '')
          setName(e.target.value.replace(/[^a-zA-Z]+/g, ''))
        }} required />
        <label htmlFor="name" className="form__label">Imię</label>
      </div>
      <div className="form__group field">
        <input type="input" className="form__field" placeholder="Surname" name="surname" id='surname' onChange={(e) => {
          e.target.value = e.target.value.replace(/[^a-zA-Z]+/g, '')
          setSurname(e.target.value.replace(/[^a-zA-Z]+/g, ''))
        }} required />
        <label htmlFor="surname" className="form__label">Nazwisko</label>
      </div>
      {idType()}
      <FileUploader
        onDrop={handleUpload}
        onSelect={handleUpload}
        name="file"
        classes="upload"
        types={["JPG", "JPEG"]}
        children={
          (
            <div className="upload_content">
              Wybierz zdjęcie!
            </div>
          )
        }
      />
      <button type="button" disabled={submitDisabled} className="btn btn-dark" onClick={() => handleSubmit()}>Wyślij</button>
    </div>
  );
};

export default Main;