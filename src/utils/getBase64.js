/*
 * @Author: chengxinyu
 * @Date: 2021-11-30 16:27:56
 * @LastEditors: chengxinyu
 * @LastEditTime: 2021-11-30 16:59:36
 */
export default function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}
