using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using MongoDB.Driver;
using MongoDB.Bson;
using MongoDB.Shared;

namespace CivilGis.Models
{
    public class FeatureDoc
    {
        // the type here reference the type in mongoVUE tree view 
        public ObjectId id { get; set; }
        public String type { get; set; }
        public BsonDocument properties { get; set; }
        public BsonDocument geometry { get; set; }
    }
}