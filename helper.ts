export const formatToCurrency = (value: number | 'Loading') => {
  if (typeof value !== 'number') {
    return value;
  }
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
  });
  return formatter.format(value);
};

export const fetchOrRefreshAuth = async (
  url: string,
  opts: RequestInit = {},
) => {
  const baseUrl = 'https://v2u4uuu6j5.execute-api.ap-southeast-1.amazonaws.com';
  opts.credentials = 'include';

  return await fetch(`${baseUrl}${url}`, opts).then(async res => {
    if (res.status !== 401) return res;

    return await fetch(`${baseUrl}/auth/refresh`, {
      method: 'POST',
      credentials: 'include',
    }).then(async result => {
      if (result.status === 200) {
        return await fetch(`${baseUrl}${url}`, opts);
      }

      return result;
    });
  });
};

export const fetchOrRefreshAuthFirebase = async (
    url: string,
    opts: RequestInit = {},
  ) => {
    const baseUrl = 'http://10.0.2.2:5001';
    opts.credentials = 'include';

    return await fetch(`${baseUrl}${url}`, opts).then(async res => {
      if (res.status !== 401) return res;

      return await fetch(`${baseUrl}/auth/refresh`, {
        method: 'POST',
        credentials: 'include',
      }).then(async result => {
        if (result.status === 200) {
          return await fetch(`${baseUrl}${url}`, opts);
        }

        return result;
      });
    });
  };