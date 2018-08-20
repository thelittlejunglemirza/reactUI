
var axios = require('axios')
var path = 'http://localhost:5000/'

export default class RequestHandler
{
	// @Post: get and returns a list of objects of all urls in db
	static getFilteredUrls(match)
	{
			return(axios.get(path + 'api/tos/versions',
				{
					'headers':
						{
							'match': match
						}
				}
			));
  }

	// @Post: get and returns a list of objects of all apis in db
	static getFilteredApis(match)
	{
			return(axios.get(path + 'api/api',
				{
					'headers':
						{
							'match': match
						}
				}
			));
	}

	// @Post: get and returns a list of objects of all projects in db
	static getFilteredProjects(match)
	{
			return(axios.get(path + 'api/project',
				{
					'headers':
						{
							'match': match
						}
				}
			));
	}

	static getIdData_tos(id)
	{
			return(axios.get(path + 'api/tos/' + id))
  }

	static getIdData_api(id)
	{
			return(axios.get(path + 'api/api/' + id))
	}

	static getIdData_project(id)
	{
			return(axios.get(path + 'api/project/' + id))
	}

	static getVersionsForUrl(url){
		return(axios.get(path + 'api/tos/versions/single',
		{
			'headers':
			{
				'url': url
			}
		}
		));
	}

	static sendStatement(obj, id)
	{
		return(
			axios.patch(path + 'api/tos/' + id,
				{
					'key': 'statements',
					'value': obj
				}
			));
	}

	static sendTosAssessment(str, id)
	{
		return(
			axios.put(path + 'api/tos/' + id,
				{
					'key': 'risk_assessment',
					'value': str
				}
			)
		);
	}

	static sendApiAssessment(str, id)
	{
		return(
			axios.patch(path + 'api/api/' + id,
				{
					'key': 'risk_assessment',
					'value': str
				}
			)
		);
	}


	//
	// 	http://mo-0232701ba.mo.sap.corp:1080/api/data/urls
  //
	// 	http://mo-0232701ba.mo.sap.corp:1080/api/data/id',{id: id}
  //
}
