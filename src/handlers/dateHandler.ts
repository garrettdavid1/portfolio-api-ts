export const toUtc = (dateTime: Date) => {
	return new Date(Date.UTC(dateTime.getUTCFullYear(), dateTime.getUTCMonth(), dateTime.getUTCDate(), dateTime.getUTCHours(), dateTime.getMinutes(), dateTime.getSeconds(), dateTime.getMilliseconds()))
}