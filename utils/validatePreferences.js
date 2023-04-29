const validatePreferences = (userPreference) => {
    const { sources, categories } = userPreference;
    if (
        !sources ||
        !Array.isArray(sources) ||
        !categories ||
        !Array.isArray(categories)
    ) {
        return {
            status: false,
            message: 'Invalid preferences!',
        };
    }

    return {
        status: true,
        message: 'User preferences!',
    };
};

module.exports = validatePreferences;
