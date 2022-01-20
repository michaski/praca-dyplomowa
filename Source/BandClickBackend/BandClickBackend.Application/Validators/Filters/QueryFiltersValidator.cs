using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using BandClickBackend.Application.Dtos.Filters;
using BandClickBackend.Domain.Common;
using FluentValidation;

namespace BandClickBackend.Application.Validators.Filters
{
    public class QueryFiltersValidator : AbstractValidator<QueryFilters>
    {
        public QueryFiltersValidator()
        {
            RuleFor(q => q.Page)
                .GreaterThanOrEqualTo(1)
                .When(q => q.Page is not null)
                .NotEmpty()
                .NotNull()
                .When(q => q.PageSize is not null);
            RuleFor(r => r.PageSize)
                .GreaterThanOrEqualTo(1)
                .When(q => q.PageSize is not null)
                .NotEmpty()
                .NotNull()
                .When(q => q.Page is not null);
            RuleFor(q => q.Search)
                .MinimumLength(1)
                .MaximumLength(64)
                .When(q => !string.IsNullOrEmpty(q.Search));
            RuleFor(q => q.OrderBy)
                .NotNull()
                .When(q => q.OrderByDirection is not null);
            RuleFor(q => q.OrderByDirection)
                .NotNull()
                .When(q => q.OrderBy is not null);
        }
    }
}
