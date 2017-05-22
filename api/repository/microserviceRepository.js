function MicroserviceRepository(connection) {
	this._connection = connection();
}

MicroserviceRepository.prototype.salva = function (microservice, callback) {
	console.log(microservice);
	this._connection.query('insert into microservice set ?', microservice, callback);
}

MicroserviceRepository.prototype.atualiza = function (microservice, callback) {
	this._connection.query('update microservice set status = ? where id = ?', [microservice.status, microservice.id], callback);
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

module.exports = function () {
	return MicroserviceRepository;
}
