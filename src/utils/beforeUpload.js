/*
 * @Author: chengxinyu
 * @Date: 2021-11-30 17:00:12
 * @LastEditors: chengxinyu
 * @LastEditTime: 2021-11-30 17:00:13
 */

export default function beforeUpload(file) {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    message.error('You can only upload JPG/PNG file!');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('Image must smaller than 2MB!');
  }
  return isJpgOrPng && isLt2M;
}
