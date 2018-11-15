const makeConStringWithDate = (period, date) => {
  if (period !== 'All') {
    return [
      `/comments?since=${date}`,
      `/issues/comments?since=${date}`,
      `/pulls/comments?since=${date}`,
      '/stats/contributors',
      '/rate_limit',
    ]
  }
  if (period === 'All') {
    return [
      '/comments',
      '/issues/comments',
      '/pulls/comments',
      '/stats/contributors',
      '/rate_limit',
    ]
  }
}
module.exports = makeConStringWithDate
