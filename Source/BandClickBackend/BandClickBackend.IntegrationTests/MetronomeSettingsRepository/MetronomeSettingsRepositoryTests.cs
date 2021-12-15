using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using BandClickBackend.Application.Interfaces;
using BandClickBackend.Application.Services;
using FluentAssertions;
using Moq;
using Xunit;

namespace BandClickBackend.IntegrationTests.MetronomeSettingsRepository
{
    public class MetronomeSettingsRepositoryTests : IClassFixture<MetronomeSettingsRepositoryTestBase>
    {
        private readonly MetronomeSettingsRepositoryTestBase _base;
        private readonly Infrastructure.Repositories.MetronomeSettingsRepository _sut;
        private readonly Mock<IUserContextService> _userContextServiceMock = new Mock<IUserContextService>();

        public MetronomeSettingsRepositoryTests(MetronomeSettingsRepositoryTestBase testBase)
        {
            _base = testBase;
            _sut = new Infrastructure.Repositories.MetronomeSettingsRepository(_base.Context, _userContextServiceMock.Object);
        }
    }
}
