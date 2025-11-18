const refs = {
    feedbackForm: document.querySelector(".feedback-form"),
}
// ств обєкт в якому буду значення 
let formData = { email: '', message: '' };


const formDataValidation = () => {
    // виклик властивості фідбек-форм-стейт якщо її нема то запишеться налл і парсим щоб з ним працювати
    const formDataFromLS = JSON.parse(localStorage.getItem('feedback-form-state'));

    if (formDataFromLS === null) {
        refs.feedbackForm.elements.email.value = formData.email;
        refs.feedbackForm.elements.message.value = formData.message;
        return;
}

    // console.log(formDataFromLS);

    // кожен раз значення обєкта при запуску ств пустий обєкт. записуєи значення ключа фідбек-форм-стейт в обєкт
    formData = formDataFromLS;

    // дістаєм ключі відпарсиного властивості
    const formDataFromLSKeys = Object.keys(formDataFromLS);

    // console.log(formDataFromLSKeys);

    // перебираєм на кожній ітерації і записуєм значення властивості ключа  в значення вл ключа форми 
    formDataFromLSKeys.forEach(key => {
        refs.feedbackForm.elements[key].value = formDataFromLS[key];
    });

}

formDataValidation();


// console.log(refs.feedbackForm.elements);

    // деструктуризація діставєм вл таргет для змінної формфілд
const formHandle = ({target: formField}) => {
    // вміст значення формфілд і також обрізаєм лишні пробіли
    const formFieldValue = formField.value.trim();
    // зчитуєм знач атрибута щоб в формдаті не перезаписувався рядок і додавався 
    const formFieldName = formField.name;


    // записуєм для передавання даних ключ як назва атрибута а значення як значення поточного ел
    formData[formFieldName] = formFieldValue;
    // console.log(formData);
    
// записуєм в локал з назваою ключа фідбек-форм-стейт і значенням обєкт з валідним рядком джсон формата 
    localStorage.setItem("feedback-form-state", JSON.stringify(formData))
}



const buttonHandle = evt => {
    evt.preventDefault();
    // console.log("gh");

    if (!formData.email || !formData.message) {
    return alert("Fill please all fields");
    }

    console.log(formData);
    // formData = { email: '', message: '' };

    formData.email = '';
    formData.message = '';

    evt.target.reset();
    localStorage.removeItem("feedback-form-state");
}

refs.feedbackForm.addEventListener("input", formHandle);
refs.feedbackForm.addEventListener("submit", buttonHandle);