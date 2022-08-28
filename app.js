
const form = document.querySelector('.form')
form.addEventListener('submit', (e) => e.preventDefault())

const createInput = function (name, id, type, labelContent) {
  const label = document.createElement('label')
  const input = document.createElement('input')
  const div = document.createElement('div')
  label.setAttribute('for', id)
  label.textContent = labelContent
  input.setAttribute('id', id)
  input.setAttribute('name', name)
  input.setAttribute('type', type)
  input.setAttribute('required', '')
  div.appendChild(label)
  div.appendChild(input)
  form.appendChild(div)
  return input
}

const email = createInput('user-email', 'user-email', 'email', 'Email')
const country = createInput('user-country', 'user-country', 'text', 'Country')
const zipCode = createInput('user-zip-code', 'user-zip-code', 'text', 'Zip Code')
const password = createInput('user-password', 'user-password', 'password', 'Password')
const confirmationPassword = createInput('user-confirmation-password', 'user-confirmation-password', 'password', 'Confirmation Password')
zipCode.setAttribute('minlength', 1)
country.setAttribute('minlength', 5)
password.setAttribute('minlength', 10)
confirmationPassword.setAttribute('minlength', 10)

const inputs = [email, country, zipCode, password, confirmationPassword]

const errorDiv = document.createElement('div')
const errorParagraph = document.createElement('p')
errorDiv.appendChild(errorParagraph)
form.appendChild(errorDiv)

const submitButton = document.createElement('button')
submitButton.setAttribute('type', 'submit')
submitButton.textContent = 'Submit'
form.appendChild(submitButton)

const changeErrorParagraphContent = function (str) {
	errorParagraph.textContent = str
}

const showEmailError = function () {
	if (email.validity.typeMismatch) {
		changeErrorParagraphContent('Error: Entered value is not an email.')
	} else if (email.validity.valueMissing) {
		changeErrorParagraphContent('Error: Entering an email is required.')
	}
}

const showCountryError = function () {
	if (country.validity.typeMismatch) {
		changeErrorParagraphContent('Error: Entered value is not a country.')
	} else if (email.validity.valueMissing) {
		changeErrorParagraphContent('Error: Entering a country is required.')
	}
}

const showZipCodeError = function () {
	if (zipCode.validity.tooShort) {
		changeErrorParagraphContent('Error: Entered value is too short to be a zip code.')
	} else if (zipCode.validity.valueMissing) {
		changeErrorParagraphContent('Error: Entering a zip code is required.')
	}
}

const showPasswordError = function () {
	if (password.value !== confirmationPassword.value) {
		changeErrorParagraphContent('Error: The passwords do not match.')
	} else if (password.validity.tooShort) {
		changeErrorParagraphContent('Error: Entered value is too short to be a password.')
	} else if (password.validity.valueMissing) {
		changeErrorParagraphContent('Error: Entering a password is required.')
	}
}

const showConfirmationPasswordError = function () {
	if (password.value !== confirmationPassword.value) {
		changeErrorParagraphContent('Error: The passwords do not match.')
	} else if (password.validity.tooShort) {
		changeErrorParagraphContent('Error: Entered value is too short to be a password.')
	} else if (password.validity.valueMissing) {
		changeErrorParagraphContent('Error: Entering your password again is required.')
	}
}

const showSubmitError = (function () {
	form.addEventListener('submit', () => {
		if (inputs.every((input) => input.checkValidity() === true)) {
			removeError()
		} else {
			if ((inputs.every((input) => input.checkValidity() === false)) === false) {
				showEmailError()
				showCountryError()
				showEmailError()
				showPasswordError()
				showConfirmationPasswordError()
			} else {
				errorParagraph.textContent = 'Error: Every entered values are wrong.'
			}
		}
		submitButton.classList.add('submitted')
	})
})()

const removeError = function () {
	errorParagraph.textContent = 'Success: Every input is valid.'
	errorDiv.classList.remove('error')
	errorDiv.classList.add('success')
}

const addErrorClass = function (element) {
	if (!element.validity.valid) {
		errorDiv.classList.add('error')
		element.classList.remove('success')
		element.classList.add('error')
	} else {
		element.classList.remove('error')
		element.classList.add('success')
	}
}

const addEvent = function (element, errorFunction) {
	element.addEventListener('input', () => {
		errorFunction()
		addErrorClass(element)
		if (inputs.every((input) => input.checkValidity() === true)) {
			removeError()
		}
	})
}

addEvent(email, showEmailError)
addEvent(country, showCountryError)
addEvent(zipCode, showZipCodeError)
addEvent(password, showPasswordError)
addEvent(confirmationPassword, showConfirmationPasswordError)
