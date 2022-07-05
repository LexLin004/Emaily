/** returning a function, use a lowercase v */
const re = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

export default (emails) => {

    const invalidEmails = emails.split(',').map(email => email.trim()).filter(email => re.test(email) === false);
    // re.test(email) return true if the email is valid
    // filter wants to capture the case in which the thing is not valid
    if (invalidEmails.length) {
        return `These emails are invalid: ${invalidEmails}`;
    }
    return;
};