import QRCode from 'qrcode'

export const generateQRCode = async (data, options = {}) => {
  try {
    const qrCodeDataURL = await QRCode.toDataURL(data, {
      width: 200,
      margin: 2,
      color: {
        dark: '#000000',
        light: '#FFFFFF'
      },
      ...options
    })
    return qrCodeDataURL
  } catch (error) {
    console.error('Error generating QR code:', error)
    throw error
  }
}

export const generateMemberQR = async (memberId) => {
  const verificationUrl = `${window.location.origin}/verify/${memberId}`
  return generateQRCode(verificationUrl, {
    width: 150,
    color: {
      dark: '#f59e0b',
      light: '#000000'
    }
  })
}