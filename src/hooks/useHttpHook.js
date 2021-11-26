/*
 * @Author: chengxinyu
 * @Date: 2021-11-19 16:28:01
 * @LastEditors: chengxinyu
 * @LastEditTime: 2021-11-26 15:12:05
 */
import { useState, useEffect } from 'react';
import Http from '../utils/http';

export default function useHttpHook({
  url,
  method = 'post',
  headers,
  body = {},
  watch = [],
}) {
  const [result, setResult] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Http({
      url,
      method,
      headers,
      body,
      setResult,
      setLoading,
    });
  }, watch);

  return [result, loading];
}
