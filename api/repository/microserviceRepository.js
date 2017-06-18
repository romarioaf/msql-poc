function MicroserviceRepository(connection) {
	this._connection = connection();
}

MicroserviceRepository.prototype.salva = function (microservice, callback) {
	console.log(microservice);
	this._connection.query('insert into microservice set ?', microservice, callback);
}

MicroserviceRepository.prototype.atualiza = function (microservice, callback) {
	this._connection.query('update microservice set nome = ?, ip_servidor = ?, porta = ?, path = ? where id = ?', 
		[microservice.nome, microservice.ip_servidor, microservice.porta, microservice.path, microservice.id], callback);
}

MicroserviceRepository.prototype.lista = function (callback) {
	this._connection.query('select * from microservice', callback);
}

MicroserviceRepository.prototype.buscaPorId = function (id, callback) {
	this._connection.query('select * from microservice where id = ?', [id], callback);
}

MicroserviceRepository.prototype.delete = function(Microservice, callback) {
	this._connection.query('delete from microservice where id = ?', [microservice.id], callback);
}

MicroserviceRepository.prototype.registraCount = function (id, callback) {
	this._connection.query('update microservice set status_count = "REGISTER" where id = ?', [id], callback);
}

MicroserviceRepository.prototype.desregistraCount = function (id, callback) {
	this._connection.query('update microservice set status_count = "UNREGISTER" where id = ?', [id], callback);
}

MicroserviceRepository.prototype.registraMemoryUsage = function (id, callback) {
	this._connection.query('update microservice set status_memory_usage = "REGISTER" where id = ?', [id], callback);
}

MicroserviceRepository.prototype.desregistraMemoryUsage = function (id, callback) {
	this._connection.query('update microservice set status_memory_usage = "UNREGISTER" where id = ?', [id], callback);
}

MicroserviceRepository.prototype.registraCountError = function (id, callback) {
	this._connection.query('update microservice set status_count_error = "REGISTER" where id = ?', [id], callback);
}

MicroserviceRepository.prototype.desregistraCountError = function (id, callback) {
	this._connection.query('update microservice set status_count_error = "UNREGISTER" where id = ?', [id], callback);
}

module.exports = function () {
	return MicroserviceRepository;
}
