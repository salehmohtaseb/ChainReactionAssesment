function ValidationFactory() {
	return (schema) => {
		return async (req, res, next) => {
		
            try {
                await schema.validateAsync({...req.body, ...req.params}, { abortEarly: false });
               
            } catch (err) {
                const errors  = err.details.map((row) => {
                    return row.message
                })

                if (err) {
                    return res.status(400).send({ error: errors });
                }
            }
           
			next();
		};
	};
}

module.exports = ValidationFactory();