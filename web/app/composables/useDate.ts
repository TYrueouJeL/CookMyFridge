export const useDate = () => {
  /**
   * Formate une date ISO en format français lisible
   * @param dateString - Date au format ISO string
   * @param options - Options de formatage Intl.DateTimeFormat
   * @returns Date formatée
   */
  const formatDate = (
    dateString: string | null | undefined,
    options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }
  ): string => {
    if (!dateString) return ''
    
    try {
      const date = new Date(dateString)
      return new Intl.DateTimeFormat('fr-FR', options).format(date)
    } catch (error) {
      console.error('Erreur lors du formatage de la date:', error)
      return dateString
    }
  }

  /**
   * Formate une date avec l'heure
   */
  const formatDateTime = (dateString: string | null | undefined): string => {
    return formatDate(dateString, {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  /**
   * Formate une date de manière courte (ex: 27/01/2026)
   */
  const formatDateShort = (dateString: string | null | undefined): string => {
    return formatDate(dateString, {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    })
  }

  /**
   * Affiche une date relative (ex: "il y a 2 jours")
   */
  const formatRelativeTime = (dateString: string | null | undefined): string => {
    if (!dateString) return ''
    
    try {
      const date = new Date(dateString)
      const now = new Date()
      const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000)

      if (diffInSeconds < 60) return 'à l\'instant'
      if (diffInSeconds < 3600) {
        const minutes = Math.floor(diffInSeconds / 60)
        return `il y a ${minutes} minute${minutes > 1 ? 's' : ''}`
      }
      if (diffInSeconds < 86400) {
        const hours = Math.floor(diffInSeconds / 3600)
        return `il y a ${hours} heure${hours > 1 ? 's' : ''}`
      }
      if (diffInSeconds < 2592000) {
        const days = Math.floor(diffInSeconds / 86400)
        return `il y a ${days} jour${days > 1 ? 's' : ''}`
      }
      if (diffInSeconds < 31536000) {
        const months = Math.floor(diffInSeconds / 2592000)
        return `il y a ${months} mois`
      }
      
      const years = Math.floor(diffInSeconds / 31536000)
      return `il y a ${years} an${years > 1 ? 's' : ''}`
    } catch (error) {
      console.error('Erreur lors du calcul du temps relatif:', error)
      return dateString
    }
  }

  return {
    formatDate,
    formatDateTime,
    formatDateShort,
    formatRelativeTime
  }
}
