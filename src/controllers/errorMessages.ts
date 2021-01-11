export enum RegisterUserError {
	invalidEmail = 'Invalid email address format',
	invalidPassword = 'Password does not meet requirements',
	accountAlreadyExists = 'An account already exists for this email address.',
	missingData = 'Missing essential data'
}

export enum GenericError {
	missingData = 'Missing essential data'
}