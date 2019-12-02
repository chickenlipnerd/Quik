using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;

namespace QuikServe.Models
{
    public partial class QsSupportContext : DbContext
    {
        public DbSet<UserParms> UserParms { get; set; }
        public DbSet<WebUser> WebUsers { get; set; }
        public DbSet<WebReports> WebReports { get; set; }
        public DbSet<WebReportSettings> WebReportSettings { get; set; }
        public DbSet<WebUserWebReportSettings> WebUserWebReportSettings { get; set; }
        public DbSet<WebReportFieldSettings> WebReportFieldSettings { get; set; }
    }

    /*public class GenericRepository<TEntity> where TEntity : class
    {
        internal QsSupportContext context;
        internal DbSet<TEntity> dbSet;
        public virtual IEnumerable<TEntity> GetWithRawSql(string query, params object[] parameters)
        {
            return dbSet.SqlQuery(query, parameters).ToList();
        }
    }*/
}
