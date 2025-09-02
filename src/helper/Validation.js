const EmailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
class Helper {
  isEmpty(value) {
    if (value.length === 0) {
      return true;
    } else {
      return false;
    }
  }
  isEmail(value) {
    return !EmailRegex.test(value);
  }
  getBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  }
}
export const { isEmpty, isEmail, getBase64 } = new Helper();
