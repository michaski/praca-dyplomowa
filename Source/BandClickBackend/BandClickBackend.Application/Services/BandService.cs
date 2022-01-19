using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using BandClickBackend.Application.Dtos.Band;
using BandClickBackend.Application.Dtos.UserInBands;
using BandClickBackend.Application.Interfaces;
using BandClickBackend.Domain.Entities;
using BandClickBackend.Domain.Interfaces;
using FluentValidation;

namespace BandClickBackend.Application.Services
{
    public class BandService : IBandService
    {
        private readonly IBandRepository _bandRepository;
        private readonly IUserInBandsRepository _userInBandsRepository;
        private readonly IUserRepository _userRepository;
        private readonly IPlaylistSharedInBandRepository _playlistSharedInBandRepository;
        private readonly IMapper _mapper;

        public BandService(
            IBandRepository bandRepository, 
            IUserInBandsRepository userInBandsRepository,
            IUserRepository userRepository,
            IMapper mapper, IPlaylistSharedInBandRepository playlistSharedInBandRepository)
        {
            _bandRepository = bandRepository;
            _userInBandsRepository = userInBandsRepository;
            _mapper = mapper;
            _playlistSharedInBandRepository = playlistSharedInBandRepository;
            _userRepository = userRepository;
        }

        public async Task<IEnumerable<BandListDto>> GetBandsWhereUserIsLeaderAsync()
        {
            return _mapper.Map<IEnumerable<Band>, IEnumerable<BandListDto>>(
                await _userInBandsRepository.GetBandsWhereUserIsLeaderAsync());
        }

        public async Task<IEnumerable<BandListDto>> GetAllBandsWhichUserBelongsToAsync()
        {
            return _mapper.Map<IEnumerable<Band>, IEnumerable<BandListDto>>(
                await _userInBandsRepository.GetAllBandsWhichUserBelongsToAsync());
        }

        public async Task<BandDetailDto> GetBandByIdAsync(Guid id)
        {
            return _mapper.Map<Band, BandDetailDto>(
                await _bandRepository.GetBandByIdAsync(id));
        }

        public async Task<BandDetailDto> CreateAsync(string bandName)
        {
            if (string.IsNullOrEmpty(bandName) || bandName.Length > 64)
            {
                throw new ValidationException("Nazwa zespołu musi być poprawnym wyrażeniem składającym się z od 1 do 64 liter.");
            }
            var newBand = new Band()
            {
                Name = bandName
            };
            var createdBand = await _bandRepository.CreateAsync(newBand);
            await _userInBandsRepository.AddLeaderAsync(createdBand.Id);
            return _mapper.Map<Band, BandDetailDto>(createdBand);
        }

        public async Task UpdateAsync(UpdateBandDto band)
        {
            var bandEntity = await _bandRepository.GetBandByIdAsync(band.Id);
            bandEntity.Name = band.Name;
            await _bandRepository.UpdateAsync(bandEntity);
        }

        public async Task DeleteAsync(Guid bandId)
        {
            await _bandRepository.DeleteAsync(
                await _bandRepository.GetBandByIdAsync(bandId));
        }

        public async Task DemoteLeaderAsync(UserBandRelationDto dto)
        {
            var leader = await _userRepository.GetUserByUsernameAsync(dto.Username);
            await _userInBandsRepository.DemoteLeaderAsync(dto.BandId, leader.Id);
        }

        public async Task AddMemberAsync(UserBandRelationDto dto)
        {
            var member = await _userRepository.GetUserByUsernameAsync(dto.Username);
            await _userInBandsRepository.AddMemberAsync(dto.BandId, member.Id);
        }

        public async Task PromoteMemberAsync(UserBandRelationDto dto)
        {
            var member = await _userRepository.GetUserByUsernameAsync(dto.Username);
            await _userInBandsRepository.PromoteMemberAsync(dto.BandId, member.Id);
        }

        public async Task RemoveUserFromBandAsync(UserBandRelationDto dto)
        {
            var member = await _userRepository.GetUserByUsernameAsync(dto.Username);
            await _userInBandsRepository.RemoveUserFromBandAsync(dto.BandId, member.Id);
        }

        public async Task<bool> IsUserBandLeaderAsync(Guid bandId)
        {
            return await _userInBandsRepository.IsUserBandLeaderAsync(bandId);
        }

        public async Task<bool> IsUserInBandAsync(Guid bandId)
        {
            return await _userInBandsRepository.IsUserInBandAsync(bandId);
        }

        public async Task<bool> IsUserInBandWithAsync(Guid entityCreatedBy, Guid bandId)
        {
            return await _userInBandsRepository.UserIsInBandWithAsync(entityCreatedBy, bandId);
        }

        public async Task<bool> MetronomeSettingIsSharedInBandAsync(Guid settingId, Guid bandId)
        {
            return await _playlistSharedInBandRepository.MetronomeSettingIsSharedInBandAsync(settingId, bandId);
        }
    }
}
